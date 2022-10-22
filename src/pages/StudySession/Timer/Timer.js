import React, { useEffect, useContext, useRef } from "react";
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";

import StudySessionContext from "store/StudySessionContext";
import { PlayIcon, PauseIcon } from "utils/icons";

const Timer = () => {
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useContext(StudySessionContext);

  const didMount = useRef();
  useEffect(() => {
    if (didMount.current) return;

    reset(0, true);
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
