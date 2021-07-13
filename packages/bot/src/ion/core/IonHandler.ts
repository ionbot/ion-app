// TODO: This file *might* be moved to a better place

import { TelegramClient } from "telegram";
import { NewMessageEvent } from "telegram/events";

export interface IonHandlerMeta {
  match: string | string[] | RegExp;
  scope?: "all" | "group" | "private" | "channel";
  mode?: "all" | "outgoing" | "incoming";
}

export default class {
  handler: (
    client: TelegramClient,
    event: NewMessageEvent,
    config?: any
  ) => void;
  meta: IonHandlerMeta;

  constructor(
    handler: (
      client: TelegramClient,
      event: NewMessageEvent,
      config?: any
    ) => void,
    meta: IonHandlerMeta
  ) {
    this.handler = handler;
    this.meta = meta;
  }
}
