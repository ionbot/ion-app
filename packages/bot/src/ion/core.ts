import winston from "winston";
import { TelegramClient } from "telegram";
import { NewMessage } from "telegram/events";
import { StringSession } from "telegram/sessions";
import { allModules } from "./modules";
import * as session from "./session";

import VERSION from "../version";
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

  private apiId: number;
  private apiHash: string;
  public user: any;
  public botStatus: number;

  constructor() {
    logger.info(`Initializing Ion v${VERSION}`);

    this.apiId = 0;
    this.apiHash = "";
    this.botStatus = 0;

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
      this.loadModules();
    }
  }

  createPattern(text: string | RegExp) {
    if (typeof text == "string") return new RegExp(text);
    return text;
  }

  loadModules() {
    allModules.map((mod) => {
      let mode = {
        outgoing: mod.mode === "outgoing",
        icoming: mod.mode === "incoming",
      };

      this.client?.addEventHandler(
        mod.handler(),
        new NewMessage({ ...mode, pattern: this.createPattern(mod.match) })
      );
    });
  }

  stop() {
    this.botStatus = 0;
    /** stop user bot */
  }
})();
