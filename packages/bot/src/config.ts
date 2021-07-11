import { readFileSync } from "fs-extra";
import path from "path";
import env from "./env";

let configFile = path.join(__dirname, "../../config.json");

let config = {};

if (env.NODE_ENV == "development") {
}

config = readFileSync(configFile);
