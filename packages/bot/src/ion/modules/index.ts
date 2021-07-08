import Ping from "./ping";

export interface ModuleMeta {
  name: string;
  description?: string;
  slug: string;
  match: string | RegExp;
  scope: "all" | "private" | "group";
  mode: "all" | "outgoing" | "incoming";
  config?: object;
}

export const allModules = [Ping];
