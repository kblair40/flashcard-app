import { extendTheme } from "@chakra-ui/react";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const inputHelpers = createMultiStyleConfigHelpers([
  "addon",
  "field",
  "element",
]);
const selectHelpers = createMultiStyleConfigHelpers(["icon", "field"]);

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
  layerStyles: {
    "lm-btn-primary": {
      bg: "primary.400",
    },
    "dm-btn-primary": {},
  },
  textStyles: {
    "lm-primary": { color: "gray.800" },
    "lm-secondary": { color: "gray.600" },
    "lm-tertiary": { color: "gray.400" },
    "dm-primary": { color: "gray.50" },
    "dm-secondary": { color: "gray.200" },
    "dm-tertiary": { color: "gray.400" },
  },
  components: {
    Icon: {
      baseStyle: ({ colorMode: cm }) => ({
        fill: cm === "dark" ? "gray.50" : "gray.800",
      }),
    },
    Text: {
      baseStyle: ({ colorMode: cm }) => ({
        color: cm === "dark" ? "gray.50" : "gray.800",
      }),
    },
    Button: {
      variants: {
        "solid-blue": ({ colorMode: cm }) => ({
          bg: cm === "dark" ? "blue.700" : "blue.400",
          color: cm === "dark" ? "#fff" : "#fff",

          _hover: {
            bg: cm === "dark" ? "blue.600" : "blue.500",
          },
          _active: {
            bg: cm === "dark" ? "blue.500" : "blue.600",
          },
          _disabled: {
            _hover: { bg: cm === "dark" ? "blue.600" : "blue.500" },
          },
        }),
        "solid-red": ({ colorMode: cm }) => ({
          bg: cm === "dark" ? "red.700" : "red.400",
          color: cm === "dark" ? "#fff" : "#fff",

          _hover: {
            bg: cm === "dark" ? "red.600" : "red.500",
          },
          _active: {
            bg: cm === "dark" ? "red.500" : "red.600",
          },
          _disabled: {
            pointerEvents: "none",
          },
        }),
        "solid-neutral": ({ colorMode: cm }) => ({
          bg: cm === "dark" ? "gray.700" : "gray.200",
          color: cm === "dark" ? "gray.50" : "gray.700",

          _hover: {
            bg: cm === "dark" ? "gray.600" : "gray.300",
          },
          _active: {
            bg: cm === "dark" ? "gray.500" : "gray.400",
          },
          _disabled: {
            pointerEvents: "none",
          },
        }),
        "icon-button": ({ colorMode: cm }) => ({
          transition: "background 0.2s",
          bg: "transparent",
          _hover: {
            bg: cm === "dark" ? "gray.700" : "gray.100",
          },
          _active: {
            bg: cm === "dark" ? "gray.600" : "gray.200",
          },
        }),
        "icon-button-red": ({ colorMode: cm }) => ({
          transition: "background 0.2s",
          bg: "transparent",
          _hover: {
            bg: cm === "dark" ? "red.400" : "red.50",
          },
          _active: {
            bg: cm === "dark" ? "red.500" : "red.100",
          },
        }),
      },
      baseStyle: {
        _disabled: { _hover: { bg: "unset" } },
      },
      defaultProps: {
        variant: "solid-neutral",
      },
    },
    Select: selectHelpers.defineMultiStyleConfig({
      variants: {
        "neutral-outline": ({ colorMode: cm }) => ({
          field: {
            bg: "transparent",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: cm === "dark" ? "gray.500" : "gray.300",
            color: cm === "dark" ? "gray.50" : "gray.800",

            _hover: {
              borderColor: cm === "dark" ? "gray.400" : "gray.400",
            },
            _focus: {
              borderColor: cm === "dark" ? "gray.300" : "gray.500",
            },
            _focusVisible: { outline: "none" },
            _placeholder: {
              color: cm === "dark" ? "gray.300" : "gray.400",
            },
          },
          icon: {},
        }),
      },
    }),
    Input: inputHelpers.defineMultiStyleConfig({
      variants: {
        "neutral-outline": ({ colorMode: cm }) => ({
          field: {
            bg: "transparent",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: cm === "dark" ? "gray.500" : "gray.300",
            color: cm === "dark" ? "gray.50" : "gray.800",

            _hover: {
              borderColor: cm === "dark" ? "gray.400" : "gray.400",
            },
            _focus: {
              borderColor: cm === "dark" ? "gray.300" : "gray.500",
            },
            _focusVisible: { outline: "none" },
            _placeholder: {
              color: cm === "dark" ? "gray.300" : "gray.500",
            },
          },
          element: {},
          addon: {},
        }),
      },
    }),
    EditableInput: {
      baseStyle: ({ colorMode: cm }) => ({
        border: "1px solid",
        borderColor: "gray.500",
        // borderColor: cm === "dark" ? "gray.500" : "gray.300",
      }),
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
    heading: "Open Sans, sans-serif",
  },
});

export default theme;
