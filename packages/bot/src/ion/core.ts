import winston from "winston";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import * as session from "./session";

import { Logger } from "telegram/extensions";
Logger.setLevel("errors");

const { NODE_ENV } = process.env;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [], //todo: add file logging
});

if (NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

class Ion {
  private client: TelegramClient | undefined;
  private session: StringSession | undefined;

  private apiId: number;
  private apiHash: string;
  public user: any;
  public botStatus: number;

  constructor() {
    console.log(`initialising ion`);

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

      console.log(`[ion] logged in as ${this.user.firstName}`);
    }
  }
  stop() {
    this.botStatus = 0;
    /** stop user bot */
  }
}
export { Ion };
