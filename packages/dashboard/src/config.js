export const HOST = REACT_APP_HOST
  ? REACT_APP_HOST
  : window.location.host.includes("localhost")
  ? "http://localhost:4200"
  : ""; // sets the current website as host
