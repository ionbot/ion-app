import { readJSONSync, writeJSONSync } from "fs-extra";
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
  return readJSONSync(sessionFile);
};
