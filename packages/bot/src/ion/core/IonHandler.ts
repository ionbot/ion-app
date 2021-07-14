// TODO: This file *might* be moved to a better place

import { TelegramClient } from "telegram";
import { NewMessageEvent } from "telegram/events";

export interface IonHandlerParams {
  commands?: string | string[];
  pattern?: RegExp;
  scope?: "all" | "group" | "private" | "channel";
  mode?: "all" | "outgoing" | "incoming";
}

export default class {
  handler: (
    client: TelegramClient,
    event: NewMessageEvent,
    config?: any
  ) => void;
  params: IonHandlerParams;

  constructor(
    handler: (
      client: TelegramClient,
      event: NewMessageEvent,
      config?: any
    ) => void,
    params: IonHandlerParams
  ) {
    if (!params.commands && !params.pattern && !params.scope) {
      throw new Error(
        "You must at least provide one of: commands, pattern and scope"
      );
    }

    this.handler = handler;
    this.params = params;
  }
}
