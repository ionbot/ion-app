import React from "react";
import ReactDOM from "react-dom";
import "focus-visible";

import Router from "./router";
import { Provider } from "use-http";
import { ChakraProvider } from "@chakra-ui/react";

import defaultTheme from "./themes/default";

const { REACT_APP_HOST } = process.env;

ReactDOM.render(
  <ChakraProvider theme={defaultTheme}>
    <Provider url={REACT_APP_HOST + "/api"}>
      <Router />
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);
