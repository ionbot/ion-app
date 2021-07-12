let { REACT_APP_HOST } = process.env;

export const HOST = REACT_APP_HOST
  ? REACT_APP_HOST
  : window.location.host.includes("localhost")
  ? "http://localhost:4200"
  : ""; // set the current website as host
