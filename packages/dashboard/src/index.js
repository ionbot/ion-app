import React from "react";
import ReactDOM from "react-dom";
import "focus-visible";

import Router from "./router";
import { Provider } from "use-http";
import { ChakraProvider } from "@chakra-ui/react";

import defaultTheme from "./themes/default";

let { REACT_APP_HOST: host } = process.env;

if (!host) {
  host = "http://localhost:4200"; // default use localhost
}

ReactDOM.render(
  <ChakraProvider theme={defaultTheme}>
    <Provider url={host + "/api"}>
      <Router />
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);
