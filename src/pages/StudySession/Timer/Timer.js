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
            variant="ghost"
            size="xs"
            rounded="full"
            bg="transparent"
            transition="background 0.3s"
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.200" }}
            onClick={() => {
              if (isRunning) pause();
              else start();
            }}
            icon={
              !isRunning ? (
                <PlayIcon boxSize="13px" />
              ) : (
                <PauseIcon boxSize="14px" />
              )
            }
          />
        </Flex>

        <Flex align="center" ml="6px">
          {hours > 0 && <Text>{hours}:</Text>}
          <Text>{padTime(minutes)}:</Text>
          <Text>{padTime(seconds)}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Timer;
