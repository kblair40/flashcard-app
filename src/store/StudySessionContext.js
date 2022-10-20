import { createContext, useEffect, useState, useRef } from "react";
import { useStopwatch } from "react-timer-hook";
import { useLocation, useParams } from "react-router-dom";

import { getUnixTimestamp } from "utils/helpers";
import api from "api";

const StudySessionContext = createContext();

const StudySessionProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState();
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({
      autoStart: false,
    });

  const params = useParams();
  const { pathname } = useLocation();

  const patchedSession = useRef(false);

  useEffect(() => {
    const patchSessionDuration = async () => {
      if (!sessionId) {
        console.log("NO SESSION ID IN STATE - UNABLE TO PATCH");
        return;
      }

      console.log("HOURS/MINUTES/SECONDS:", { hours, minutes, seconds });

      if (hours || minutes) {
        try {
          const response = await api.patch(`/study_session/${sessionId}`, {
            duration: { hours, minutes, seconds },
          });
          console.log("SESSION PATCH RESPONSE:", response.data);
        } catch (e) {
          console.error("FAILED PATCHING SESSION:", e);
          return;
        }
      } else {
        console.log("DELETING");
        try {
          const response = await api.get("/history");
          console.log("DELETE RESPONSE:", response.data);
        } catch (e) {
          console.error("FAILED DELETING SESSION:", e);
        }
      }
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

  const createStudySession = async (setId) => {
    console.log("CREATE STUDY SESSION");
    patchedSession.current = false; // start with this, called onMount in StudySession component
    try {
      const response = await api.post("/study_session", {
        flashcard_set: setId,
        start_time: getUnixTimestamp(),
      });
      console.log("\n\n\nCREATE RESPONSE:", response.data);
      if (response.data && response.data.study_session) {
        const { _id } = response.data.study_session;
        setSessionId(_id);
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
      }}
    >
      {children}
    </StudySessionContext.Provider>
  );
};

export default StudySessionContext;

export { StudySessionProvider };
