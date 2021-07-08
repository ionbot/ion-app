const { NODE_ENV } = process.env;
const { version: VERSION } = require(NODE_ENV === "production"
  ? "./package.json"
  : "../package.json");

export default VERSION;
