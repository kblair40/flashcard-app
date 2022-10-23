import React, { useEffect, useContext, useRef } from "react";
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { useBeforeunload } from "react-beforeunload";

import StudySessionContext from "store/StudySessionContext";
import { PlayIcon, PauseIcon } from "utils/icons";

const Timer = () => {
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useContext(StudySessionContext);

  console.log("type:", typeof seconds, typeof minutes, typeof hours);

  useBeforeunload(async (e) => {
    e.preventDefault();
    if (seconds || minutes || hours) {
      console.log("Dur:", { seconds, minutes, hours });
      const numOfSeconds = seconds + minutes * 60 + hours * 60 * 60;
      console.log("NUM OF SECONDS:", numOfSeconds);
      localStorage.setItem("ellapsed_time", numOfSeconds);
    }
  });

  const didMount = useRef();
  useEffect(() => {
    if (didMount.current) return;
    let ellapsed_seconds = localStorage.getItem("ellapsed_time");
    let offset = 0;
    if (ellapsed_seconds) {
      console.log("YES ELLAPSED SECONDS:", ellapsed_seconds);
      offset = new Date();
      // offset.setSeconds(offset.getSeconds() + ellapsed_seconds);
      offset.setSeconds(ellapsed_seconds);
      // reset(ellapsed_seconds, true);
      reset(offset, true);
      localStorage.removeItem("ellapsed_time");
    } else {
      reset(0, true);
    }
    didMount.current = true;
  }, [reset]);

  const padTime = (num) => {
    return String(num).length === 2 ? num : `0${num}`;
  };

  return (
    <Box>
      <Flex align="center">
        <Flex align="center">
          <IconButton
            variant="icon-button"
            size="sm"
            rounded="full"
            onClick={() => {
              if (isRunning) pause();
              else start();
            }}
            icon={
              !isRunning ? (
                <PlayIcon boxSize="15px" />
              ) : (
                <PauseIcon boxSize="16px" />
              )
            }
          />
        </Flex>

        <Flex align="center" ml="6px" fontWeight="500">
          {hours > 0 && <Text>{hours}:</Text>}
          <Text>{padTime(minutes)}:</Text>
          <Text>{padTime(seconds)}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Timer;
