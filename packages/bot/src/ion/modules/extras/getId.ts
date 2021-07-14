import Ion from "../../core";
import IonHandler from "../../core/IonHandler";

export const getChatId = new IonHandler(
  (client, event, config) => {
    event.message.edit({
      text: `Chat ID: **${event.chatId}**`,
      parseMode: "markdown",
    });
  },
  { commands: "chatid" }
);

export const getUserId = new IonHandler(
  async (client, event, config) => {
    let id = undefined;

    if (event.message.replyTo) {
      id = event.message.replyTo.replyToPeerId;
    } else {
      const user = Ion.user;

      if (user) {
        id = user.id;
      }
    }

    await event.message.edit({
      text: `User ID: **${id}**`,
      parseMode: "markdown",
    });
  },
  { commands: "userid" }
);

export default [getChatId, getUserId];
