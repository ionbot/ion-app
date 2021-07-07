import winston from "winston";
import { TelegramClient } from "telegram";
import { NewMessage, NewMessageEvent } from "telegram/events";
import { StringSession } from "telegram/sessions";
import * as session from "./session";
import { readFileSync } from "fs-extra";
import io from "./socket";
import VERSION from "../version";
import { allModules } from "./modules";

import { Logger } from "telegram/extensions";
Logger.setLevel("errors");

const { NODE_ENV } = process.env;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [], //todo: add file logging
});

if (NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default new (class Ion {
  private client: TelegramClient | undefined;
  private session: StringSession | undefined;
  private socket: any;
  private prefix: string = "."; // get from config

  public loadedModules: any[] = [];
  private apiId: number;
  private apiHash: string;
  public user: any;
  public botStatus: number;
  public startTime: Date = new Date();

  constructor() {
    logger.info(`Initializing Ion v${VERSION}`);

    this.apiId = 0;
    this.apiHash = "";
    this.botStatus = 0;

    io.on("connection", (socket) => {
      this.socket = socket;
    });

    this.start();
  }
  log() {}

  async start() {
    const config = session.load();
    this.apiId = Number(config.apiId);
    this.apiHash = config.apiHash;
    this.session = new StringSession(config.session);

    if (this.session && this.apiHash && this.apiId) {
      this.client = new TelegramClient(this.session, this.apiId, this.apiHash, {
        connectionRetries: 5,
      });

      await this.client.start({ botAuthToken: "" });

      this.user = await this.client.getMe();
      this.botStatus = 1;

      logger.info(`logged in as ${this.user.firstName}`);
      this.socketHandler();
      this.loadModules();
    }
  }

  createPattern(text: string | RegExp) {
    if (typeof text == "string") return new RegExp(`^${this.prefix}${text}`);
    return text;
  }

  loadModules() {
    allModules.map((mod) => {
      let mode = {
        outgoing: mod.mode === "outgoing",
        icoming: mod.mode === "incoming",
      };

      try {
        this.client?.addEventHandler((event: NewMessageEvent) => {
          mod.handler(event);
        }, new NewMessage({ ...mode, pattern: this.createPattern(mod.match) }));

        this.loadedModules.push({
          name: mod.name,
          description: mod.description,
        });
      } catch (e) {
        console.log("e", e);
      }
    });
  }

  socketHandler() {
    /** Handle Client Socket */
  }

  stop() {
    this.botStatus = 0;
    /** stop user bot */
  }
})();
