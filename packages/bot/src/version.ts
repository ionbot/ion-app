const { NODE_ENV } = process.env;
const { version: VERSION } = require(NODE_ENV === "development"
  ? "../package.json"
  : "./package.json");

export default VERSION;
