import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import { UserProvider } from "store/UserContext";
import { StudySessionProvider } from "store/StudySessionContext";

import theme from "utils/theme";

const AllProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <UserProvider>
          <StudySessionProvider>{children}</StudySessionProvider>
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
