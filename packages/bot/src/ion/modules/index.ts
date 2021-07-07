import Ping from "./ping";

export interface ModuleMeta {
  name: string;
  description: string | undefined;
  slug: string;
  match: string | RegExp;
  scope: "all" | "private" | "group";
  mode: "all" | "outgoing" | "incoming";
}

export const allModules = [Ping];
