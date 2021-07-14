import { TelegramClient } from "telegram";
import { NewMessage, NewMessageEvent } from "telegram/events";
// import * as appConfig from "../providers/app-config";
import * as moduleConfig from "../providers/module-config";
import modules from "../modules";
import Client from "./Client";
import IonHandler from "./IonHandler";

const defaultPrefixes = ["."];

const escapeForRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export interface ModuleMeta {
  slug: string; // may be used for identification of that module
  name: string;
  description: string;
}

export interface Module {
  handlers: IonHandler | IonHandler[];
  meta: ModuleMeta;
  config?: object;
}

export interface LoadedModule {
  meta: ModuleMeta;
  config: object;
}

export default class extends Client {
  private prefixes: string[] = defaultPrefixes; //todo: load from database
  public loadedModules: LoadedModule[] = [];

  constructor() {
    super();
  }

  match(
    event: NewMessageEvent,
    patternOrCommands: string | string[] | RegExp
  ): boolean {
    const message = event.message.message;

    if (!message) {
      return false;
    }

    if (patternOrCommands instanceof RegExp) {
      return Boolean(message.match(patternOrCommands));
    }

    const commands = Array.isArray(patternOrCommands)
      ? patternOrCommands
      : [patternOrCommands];

    for (let k in this.prefixes) {
      const prefix = this.prefixes[k];

      if (message.startsWith(prefix)) {
        for (let k in commands) {
          const command = commands[k];
          const withoutPrefix = message.slice(1, message.length);

          if (withoutPrefix.match(new RegExp(`^(?:${command})(?:\\s|$)`))) {
            return true;
          }
        }
      }
    }

    return false;
  }

  loadModules() {
    /**
     * Loads Each Module by mapping.
     * Also get module configuration from database
     */

    this.loadedModules = []; // delete all previous loaded modules

    modules.map(async (mod: Module) => {
      const moduleMeta = mod.meta;
      const config: any = await moduleConfig.get(moduleMeta.slug);

      const handlers: IonHandler[] = Array.isArray(mod.handlers)
        ? mod.handlers
        : [mod.handlers];

      handlers.forEach((handler) => {
        const { meta } = handler;

        meta.mode = meta.mode || "outgoing";
        meta.scope = meta.scope || "all";

        const mode = {
          outgoing: meta.mode == "outgoing",
          incoming: meta.mode == "incoming",
        };

        try {
          this.client?.addEventHandler(
            async (event: NewMessageEvent) => {
              const config: any = await moduleConfig.get(moduleMeta.slug);
              handler.handler(
                this.client as TelegramClient,
                event,
                config ? config.values : {}
              );
            },
            new NewMessage({
              ...mode,
              func: (event) => {
                const match = this.match(event, meta.match);

                switch (meta.scope) {
                  case "private":
                    return match && !!event.isPrivate;
                  case "group":
                    return match && !!event.isGroup;
                  case "channel":
                    return match && !!event.isChannel;
                }

                return match;
              },
            })
          );
        } catch (e) {
          this.errorCount++;
        }
      });

      this.loadedModules.push({
        meta: moduleMeta,
        config: config ? config.values : {},
      });
    });
  }
}
