import env from "../../env";
import { readJSONSync, writeJSONSync, existsSync } from "fs-extra";
import path from "path";

export interface IConfig {
  prefix: string;
}

let configFile: string;

if (env.NODE_ENV === "development")
  configFile = path.join(__dirname, "../../config.json");
else configFile = path.join(__dirname, "../config.json");

const defaults: any = {
  prefix: ".",
};

const getConfigs = () => {
  if (existsSync(configFile)) {
    const config = readJSONSync(configFile);
    return config;
  } else {
    writeJSONSync(configFile, defaults);
    return defaults;
  }
};

export const save = (key: string, value: any) => {
  const configs: any = getConfigs();
  writeJSONSync(configFile, {
    ...configs,
    [key]: value,
  });
};
export const load = (key: string): any => {
  const configs: any = getConfigs();
  return configs[key];
};
