import { Api } from "telegram";
import { NewMessageEvent } from "telegram/events";
import VERSION from "../../../version";

import meta from "./meta";

const GetChatID = (event: NewMessageEvent) => {
  event.message.edit({
    text: `Chat ID: **${event.chatId}**`,
    parseMode: "markdown",
  });
};

const GetUserID = async (event: NewMessageEvent) => {
  let id = undefined;

  if (event.message.replyTo) {
    id = event.message.replyTo.replyToPeerId;
  } else {
    const user: any = await event.client?.getMe();
    if (user) {
      id = user.id;
    }
  }
  event.message.edit({
    text: `User ID: **${id}**`,
    parseMode: "markdown",
  });
};

const ExtrasModule = async (event: NewMessageEvent, config?: any) => {
  const { text } = event.message;
  if (!text) return;

  try {
    const match = text.match(/^\.(\w+)?([\s\S+])?/);
    if (!match) return;

    switch (match[1]) {
      case "chatid":
        return GetChatID(event);

      case "userid":
        return GetUserID(event);
    }
  } catch (e) {}
};

export default {
  handler: ExtrasModule,
  meta,
};
