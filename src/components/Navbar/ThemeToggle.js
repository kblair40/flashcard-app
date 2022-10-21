import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";

import { SunIcon, MoonIcon } from "utils/icons";

const ThemeToggle = ({ display, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      display={display}
      rounded="full"
      size="sm"
      variant="ghost"
      onClick={toggleColorMode}
      icon={
        colorMode === "dark" ? (
          <SunIcon boxSize="18px" fill="gray.100" />
        ) : (
          <MoonIcon boxSize="18px" fill="gray.700" />
        )
      }
      {...rest}
    />
  );
};

export default ThemeToggle;
