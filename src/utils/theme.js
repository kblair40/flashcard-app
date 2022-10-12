import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    primary: {
      base: "#1A5CFB",
      50: "#e1edff",
      100: "#b1c9ff",
      200: "#80a6ff",
      300: "#4e82fd",
      400: "#1d5efb",
      500: "#0445e2",
      600: "#0036b0",
      700: "#00267f",
      800: "#00174f",
      900: "#000820",
    },
  },
  textStyles: {
    // primary: { color: mode("gray.800", "gray.50") },
    // secondary: { color: mode("gray.600", "gray.200") },
    // tertiary: { color: mode("gray.400", "gray.400") },
    "lm-primary": { color: "gray.800" },
    "lm-secondary": { color: "gray.600" },
    "lm-tertiary": { color: "gray.400" },
    "dm-primary": { color: "gray.50" },
    "dm-secondary": { color: "gray.200" },
    "dm-tertiary": { color: "gray.400" },
  },
  fonts: {
    body: "Open Sans, sans-serif",
    heading: "Open Sans, sans-serif",
  },
});

export default theme;
