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

  match(event: NewMessageEvent, commands: string | string[]): boolean {
    const message = event.message.message;

    if (!message) {
      return false;
    }

    commands = Array.isArray(commands) ? commands : [commands];

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

    modules.map(async (module: Module) => {
      const { meta } = module;
      const config: any = await moduleConfig.get(meta.slug);

      const handlers: IonHandler[] = Array.isArray(module.handlers)
        ? module.handlers
        : [module.handlers];

      handlers.forEach((handler) => {
        const { params } = handler;

        params.mode = params.mode || "outgoing";
        params.scope = params.scope || "all";

        const mode = {
          outgoing: params.mode == "outgoing",
          incoming: params.mode == "incoming",
        };

        try {
          this.client?.addEventHandler(
            async (event: NewMessageEvent) => {
              const config: any = await moduleConfig.get(meta.slug);
              handler.handler(
                this.client as TelegramClient,
                event,
                config ? config.values : {}
              );
            },
            new NewMessage({
              ...mode,
              func: (event) => {
                let match = false;

                if (params.pattern) {
                  match = Boolean(event.message.message?.match(params.pattern));
                } else if (params.commands) {
                  match = this.match(event, params.commands);
                }

                switch (params.scope) {
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
        meta,
        config: config ? config.values : {},
      });
    });
  }
}
