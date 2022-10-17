import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    primary: {
      base: "#1A5CFB",
      50: "#d9e4fe",
      100: "#b3c9fe",
      200: "#8cadfd",
      300: "#6692fc",
      400: "#4077fc",
      500: "#1A5CFB",
      600: "#0443da",
      700: "#0332a3",
      800: "#02216d",
      900: "#011136",
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
  components: {
    Icon: {
      baseStyle: {
        fill: mode("gray.700", "gray.100"),
      },
    },
    Text: {
      defaultProps: {
        textStyle: mode("lm-primary", "dm-primary"),
      },
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
    heading: "Open Sans, sans-serif",
  },
});

export default theme;
