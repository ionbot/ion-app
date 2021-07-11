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

const GitHubRepo = (event: NewMessageEvent) => {
  event.message.edit({
    text: `<a href="https://github.com/ionbot/ion-app">Source Ion v(${VERSION})</a>`,
    parseMode: "html",
  });
};

const PurgeMessages = (event: NewMessageEvent) => {
  const { replyToMsgId } = event.message;
  const { id } = event.message;
  if (replyToMsgId) {
    for (let i = id; i >= replyToMsgId; i--) {
      try {
        event.client
          ?.invoke(
            new Api.channels.DeleteMessages({
              channel: event.chatId,
              id: [i],
            })
          )
          .catch((err) => {
            //todo: add to error log
          });
      } catch (e) {}
    }

    // console.log("messageId", JSON.stringify(messageId));
  } else {
    event.message.edit({ text: `❌ Please reply to a message.` });
  }
};

const ExtrasModule = async (event: NewMessageEvent, config?: any) => {
  const { text } = event.message;
  if (!text) return;

  try {
    const match = text.match(/^\.(\w+)?([\s\S+])?/);
    if (!match) return;

    switch (match[1]) {
      case "source":
        return GitHubRepo(event);
      case "chatid":
        return GetChatID(event);
      case "purge":
        return PurgeMessages(event);

      case "userid":
        return GetUserID(event);
    }
  } catch (e) {}
};

export default {
  handler: ExtrasModule,
  meta,
};
