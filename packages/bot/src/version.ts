import env from "./env";

const { version: VERSION } = require(env.NODE_ENV === "development"
  ? "../package.json"
  : "./package.json");

export default VERSION;
