import env from "../env";
import winston from "winston";
import { Api, TelegramClient } from "telegram";
import { NewMessage, NewMessageEvent } from "telegram/events";

import { StringSession } from "telegram/sessions";
import * as appConfig from "./providers/app-config";
import * as moduleConfig from "./providers/module-config";
import * as sessionProvider from "./providers/session";
import io from "./socket";
import VERSION from "../version";
import { allModules } from "./modules";

import { Logger } from "telegram/extensions";
Logger.setLevel("errors");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [], //todo: add file logging
});

const escapeForRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string

if (env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default new (class Ion {
  private client: TelegramClient | undefined;
  private session: StringSession | undefined;
  private prefixes: string[] = appConfig.load("prefixes").split(/\s/); // get from config

  public errorCount: number = 0;
  public config: object = {};
  public loadedModules: any[] = [];
  private apiId: number;
  private apiHash: string;
  public user: Api.User | undefined;
  public botStatus: number;
  public startTime: Date = new Date();

  constructor() {
    logger.info(`Initializing Ion v${VERSION}`);

    this.apiId = 0;
    this.apiHash = "";
    this.botStatus = 0;

    io.on("connection", (socket) => {
      /**
       * This will hanlde all the socket events
       */

      socket.on("update-config", (data) => {
        this.configUpdater(data);
      });
      socket.on("stop-bot", () => {
        this.stopBot(socket);
      });

      socket.on("start-bot", () => {
        this.start(socket);
      });
    });

    this.start();
  }

  log() {}

  async start(socket?: any) {
    /**
     * Starts the bot, and updates the start time.
     * If started, load all modules
     */

    this.startTime = new Date();
    const session = sessionProvider.load();
    this.apiId = Number(session.apiId);
    this.apiHash = session.apiHash;
    this.session = new StringSession(session.session);

    if (this.session && this.apiHash && this.apiId) {
      this.client = new TelegramClient(this.session, this.apiId, this.apiHash, {
        connectionRetries: 15,
      });

      await this.client.start({ botAuthToken: "" });

      this.user = (await this.client.getMe()) as Api.User;
      this.botStatus = 1;

      logger.info(`logged in as ${this.user.firstName}`);
      this.loadModules();

      if (socket) {
        socket.emit("bot-status", 1);
      }
    }
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

    allModules.map(async (mod) => {
      const { meta } = mod;
      let mode = {
        outgoing: meta.mode === "outgoing",
        icoming: meta.mode === "incoming",
      };

      try {
        this.client?.addEventHandler(async (event: NewMessageEvent) => {
          const config: any = await moduleConfig.get(meta.slug);
          mod.handler(event, config.values);
          this.loadedModules.push({
            ...meta,
            configValues: config ? config.values : {},
          });
        }, new NewMessage({ ...mode, pattern: this.createPattern(meta.match) }));
      } catch (e) {
        this.errorCount++;
      }
    });
  }

  configUpdater(data: any) {
    const { module, values } = data;
    moduleConfig.set(module, values);
  }

  async stopBot(socket: any) {
    this.botStatus = 0;
    await this.client?.destroy();
    socket.emit("bot-status", 0);
    return;
    /** stop user bot */
  }
})();
