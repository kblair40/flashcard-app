import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
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
  // textStyles: {
  //   secondary: { color: "gray.600" },
  // },
  textStyles: (...args) => {
    console.log("ARGS:", args);
    return {
      secondary: { color: "gray.600" },
    };
  },
});

export default theme;
