import { readJSONSync, writeJSONSync, existsSync } from "fs-extra";
import path from "path";

export interface Session {
  apiId: number;
  apiHash: string;
  session: string;
}

const { NODE_ENV } = process.env;

let sessionFile: string;

if (NODE_ENV === "development")
  sessionFile = path.join(__dirname, "../../session.json");
else sessionFile = path.join(__dirname, "../session.json");

export const save = (session: Session) => {
  writeJSONSync(sessionFile, { ...session });
};
export const load = (): Session => {
  if (existsSync(sessionFile)) {
    return readJSONSync(sessionFile);
  } else {
    writeJSONSync(sessionFile, {});
    return {
      apiId: 0,
      apiHash: "",
      session: "",
    };
  }
};
