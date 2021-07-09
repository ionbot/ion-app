import env from "../../env";
import winston from "winston";
import { Logger } from "telegram/extensions";
import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import ConfigUpdater from "./ConfigUpdater";
import * as sessionProvider from "../providers/session";
import { Socket } from "socket.io";
import VERSION from "../../version";

Logger.setLevel("errors");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [], // TODO: add file logging
});

if (env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default class Client extends ConfigUpdater {
  client?: TelegramClient;
  user?: Api.User;
  startTime: Date = new Date();
  status: number = 0;
  errorCount: number = 0;

  private session?: StringSession;
  private apiId?: number;
  private apiHash?: string;

  constructor() {
    super();

    logger.info(`Initializing Ion v${VERSION}`);

    this.start();
  }

  log() {}

  async start(socket?: Socket) {
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
      this.status = 1;

      logger.info(`Logged in as ${this.user.firstName}`);

      if (socket) {
        socket.emit("bot-status", 1);
      }
    }
  }

  async stop(socket: Socket) {
    this.status = 0;
    await this.client?.destroy();
    socket.emit("bot-status", 0);
    /** stop user bot */
  }
}
