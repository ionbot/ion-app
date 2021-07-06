import winston from "winston";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import * as session from "./session";

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
  client: TelegramClient | undefined;
  session: StringSession | undefined;

  apiId: number;
  apiHash: string;
  user: any;

  constructor() {
    console.log(`initialising ion`);

    this.apiId = 0;
    this.apiHash = "";

    this.load();
  }
  log() {}
  async load() {
    const config = session.load();
    this.apiId = config.apiId;
    this.apiHash = config.apiHash;
    this.session = new StringSession(config.session);
    this.start();
  }

  async start() {
    if (this.session && this.apiHash && this.apiId) {
      this.client = new TelegramClient(this.session, this.apiId, this.apiHash, {
        connectionRetries: 5,
      });

      await this.client.start({ botAuthToken: "" });

      this.user = await this.client.getMe();

      console.log(`[ion] logged in as ${this.user.firstName}`);
    }
  }
  stop() {
    /** stop user bot */
  }
}
export { Ion };
