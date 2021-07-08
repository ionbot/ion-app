import winston from "winston";
import { Api, TelegramClient } from "telegram";
import { NewMessage, NewMessageEvent } from "telegram/events";
import { StringSession } from "telegram/sessions";
import * as ionConfig from "./config";
import * as sessionProvider from "./session";
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
  private prefixes: string | string[] = "."; // get from config

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
      this.socket = socket;
      socket.on("update-config", (data) => {
        this.configUpdater(data);
      });
    });

    this.start();
  }

  log() {}

  async start() {
    this.startTime = new Date();
    const session = sessionProvider.load();
    this.apiId = Number(session.apiId); // why isn't it number already?
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
    }
  }

  createPattern(text: string | RegExp) {
    if (typeof text == "string") {
      const prefixes = (
        Array.isArray(this.prefixes) ? this.prefixes : [this.prefixes]
      ).join("|");

      return new RegExp(`^${prefixes}${text}`);
    }
    return text;
  }

  loadModules() {
    allModules.map(async (mod) => {
      const { meta } = mod;
      const config: any = await ionConfig.get(meta.slug);
      let mode = {
        outgoing: meta.mode === "outgoing",
        icoming: meta.mode === "incoming",
      };

      try {
        this.client?.addEventHandler((event: NewMessageEvent) => {
          mod.handler(event, config.values);
        }, new NewMessage({ ...mode, pattern: this.createPattern(meta.match) }));

        this.loadedModules.push({
          ...meta,
          configValues: config ? config.values : {},
        });
      } catch (e) {
        this.errorCount++;
      }
    });
  }

  configUpdater(data: any) {
    const { module, values } = data;
    ionConfig.set(module, values);
  }

  stop() {
    this.botStatus = 0;
    /** stop user bot */
  }
})();
