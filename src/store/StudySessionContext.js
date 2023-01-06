import { createContext, useEffect, useState, useRef } from "react";
import { useStopwatch } from "react-timer-hook";
import { useLocation, useParams } from "react-router-dom";

import { getUnixTimestamp } from "utils/helpers";
import api from "api";

const StudySessionContext = createContext();

const StudySessionProvider = ({ children }) => {
  const [badSession, setBadSession] = useState(false);
  const [sessionId, setSessionId] = useState(
    localStorage.getItem("session-id") || undefined
  );
  const [setId, setSetId] = useState();

  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({
      autoStart: false,
    });

  const params = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("\nPATHNAME:", pathname, "\n");
    if (!pathname.startsWith("/study")) {
      setBadSession(false);
      setSessionId(undefined);
      setSetId(undefined);
      // localStorage.removeItem("session-id");
    }
  }, [pathname]);

  const patchedSession = useRef(false);

  useEffect(() => {
    const patchSessionDuration = async () => {
      if (!sessionId || badSession) {
        console.log("NO SESSION ID IN STATE - UNABLE TO PATCH");
        setBadSession(false);
        return;
      }

      console.log("HOURS/MINUTES/SECONDS:", { hours, minutes, seconds });

      // At a minimum, minutes needs to be truthy (1 or more);
      if (hours || minutes) {
        try {
          const response = await api.patch(`/study_session/${sessionId}`, {
            duration: { hours, minutes, seconds },
            set_id: setId,
          });
          console.log("SESSION PATCH RESPONSE:", response.data);
        } catch (e) {
          console.error("FAILED PATCHING SESSION:", e);
          return;
        }
      } else {
        console.log("DELETING");
        // delete session if total time was less than 1 minute
        try {
          const response = await api.delete(`/history/${sessionId}`);

          if (response.data && response.data) {
            console.log("DELETE RESPONSE:", response.data);
          }
        } catch (e) {
          console.error("FAILED TO DELETE:", e);
        }
      }

      localStorage.removeItem("session-id");
    };

    if (
      !pathname.startsWith("/study") &&
      !params?.id &&
      !patchedSession.current
    ) {
      patchSessionDuration();
      patchedSession.current = true;
    }
  }, [params, pathname]);

  const createStudySession = async (setId, cardCount) => {
    // console.log("CREATE STUDY SESSION");
    // if cardCount === 0, don't create a study session.
    patchedSession.current = false; // start with this, called onMount in StudySession component
    try {
      if (cardCount) {
        const response = await api.post("/study_session", {
          flashcard_set: setId,
          start_time: getUnixTimestamp(),
        });

        setSetId(setId);
        console.log("\n\n\nCREATE RESPONSE:", response.data);
        if (response.data && response.data.study_session) {
          const { _id } = response.data.study_session;
          setSessionId(_id);
          localStorage.setItem("session-id", _id);
        }
        setBadSession(false);
      } else {
        setBadSession(true);
      }

      return true;
    } catch (e) {
      console.log("FAILED TO CREATE SESfSION:", e);
      return false;
    }
  };

  return (
    <StudySessionContext.Provider
      value={{
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        reset,
        sessionId,
        createStudySession,
        setSetId,
      }}
    >
      {children}
    </StudySessionContext.Provider>
  );
};

export default StudySessionContext;

export { StudySessionProvider };
