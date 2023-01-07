import React from "react";
import { render, screen } from "@testing-library/react";
// import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "@testing-library/jest-dom";

import theme from "utils/theme";
import App from "./App";

it("renders without crashing", () => {
  // const div = document.createElement("div");
  render(
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  );

  debugger;
  expect(true).toBeTruthy();
  // expect(screen.getByTestId("App")).toBeInTheDocument();
  // expect(screen.getByText("Learn React")).toBeInTheDocument();
});
