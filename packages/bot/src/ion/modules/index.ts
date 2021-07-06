import Ping from "./Ping";

export interface ModuleMeta {
  match: string | RegExp;
  scope: "all" | "private" | "group";
  mode: "all" | "outgoing" | "incoming";
}

export const allModules = [Ping];
