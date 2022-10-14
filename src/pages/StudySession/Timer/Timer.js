import React, { useEffect } from "react";
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { useStopwatch } from "react-timer-hook";

import { PlayIcon, PauseIcon } from "utils/icons";

const Timer = ({ setDuration }) => {
  const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({
    autoStart: true,
  });

  useEffect(() => {
    if (minutes > 0 || hours > 0) {
      setDuration({ hours, minutes });
    }
  }, [minutes]);

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