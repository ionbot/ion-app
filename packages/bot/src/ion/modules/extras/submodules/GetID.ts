import { NewMessageEvent } from "telegram/events";

export const GetChatID = (event: NewMessageEvent) => {
  event.message.edit({
    text: `Chat ID: **${event.chatId}**`,
    parseMode: "markdown",
  });
};

export const GetUserID = async (event: NewMessageEvent) => {
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
