import { NewMessage, NewMessageEvent } from "telegram/events";
// import * as appConfig from "../providers/app-config";
import * as moduleConfig from "../providers/module-config";
import { allModules } from "../modules";
import Client from "./Client";

const defaultPrefixes = ["."];

const escapeForRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default class extends Client {
  private prefixes: string[] = defaultPrefixes; //todo: load from database
  public loadedModules: any[] = [];

  constructor() {
    super();
  }

  createPattern(text: string | RegExp) {
    if (typeof text == "string") {
      return new RegExp(
        `^(${this.prefixes.filter(escapeForRegExp).join("|")})${escapeForRegExp(
          text
        )}`
      );
    }

    return text;
  }

  loadModules() {
    /**
     * Loads Each Module by mapping.
     * Also get module configuration from database
     */

    this.loadedModules = []; // delete all previous loaded modules

    allModules.map(async (mod) => {
      const { meta } = mod;
      const config: any = await moduleConfig.get(meta.slug);
      let mode = {
        outgoing: meta.mode === "outgoing",
        incoming: meta.mode === "incoming",
      };

      try {
        this.client?.addEventHandler(
          async (event: NewMessageEvent) => {
            // Fetch config again from db for make changes live
            const config: any = await moduleConfig.get(meta.slug);
            mod.handler(event, config ? config.values : {});
          },
          new NewMessage({
            ...mode,
            func: (event) => {
              return Boolean(
                event.message.message?.match(this.createPattern(meta.match))
              );
            },
          })
        );
      } catch (e) {
        this.errorCount++;
      }

      this.loadedModules.push({
        ...meta,
        configValues: config ? config.values : {},
      });
    });
  }
}
