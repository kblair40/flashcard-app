import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";

import { SunIcon, MoonIcon } from "utils/icons";

const ThemeToggle = ({ display, loc = "desktop", ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      display={display}
      rounded="full"
      size={loc === "desktop" ? "sm" : "md"}
      variant="ghost"
      onClick={toggleColorMode}
      icon={
        colorMode === "dark" ? (
          <SunIcon
            boxSize={loc === "desktop" ? "18px" : "22px"}
            fill="gray.100"
          />
        ) : (
          <MoonIcon
            boxSize={loc === "desktop" ? "18px" : "22px"}
            fill="gray.700"
          />
        )
      }
      {...rest}
    />
  );
};

export default ThemeToggle;
