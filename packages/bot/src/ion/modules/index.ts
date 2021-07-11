import eval from "./eval";
import ping from "./ping";
import extras from "./extras";

export interface ModuleMeta {
  name: string;
  description?: string;
  slug: string;
  match: string | RegExp;
  scope: "all" | "private" | "group";
  mode: "all" | "outgoing" | "incoming";
  config?: object;
}

export const allModules = [ping, eval, extras];
