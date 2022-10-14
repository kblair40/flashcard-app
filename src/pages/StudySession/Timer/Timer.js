import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useStopwatch } from "react-timer-hook";

const Timer = () => {
  const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({
    autoStart: true,
  });
  console.log("type:", typeof hours);

  const padTime = (num) => {
    return String(num).length === 2 ? num : `0${num}`;
  };

  return (
    <Box>
      <Flex>
        {hours > 0 && <Text>{hours}:</Text>}
        <Text>{padTime(minutes)}:</Text>
        <Text>{padTime(seconds)}</Text>
      </Flex>
    </Box>
  );
};

export default Timer;
