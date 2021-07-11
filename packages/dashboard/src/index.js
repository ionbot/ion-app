import React from "react";
import ReactDOM from "react-dom";
import "focus-visible";

import Router from "./router";
import { Provider } from "use-http";
import { ChakraProvider } from "@chakra-ui/react";

import defaultTheme from "./themes/default";

let { REACT_APP_HOST: HOST } = process.env;

if (!HOST) {
  HOST = "http://localhost:4200"; // default use localhost
}

ReactDOM.render(
  <ChakraProvider theme={defaultTheme}>
    <Provider url={HOST + "/api"}>
      <Router />
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);
