import { NewMessageEvent } from "telegram/events";

export const Help = (event: NewMessageEvent) => {
  event.message.edit({
    text:
      `🚀 Learn about Ion: <a href="https://docs.ionbot.site">Click here</a>\n` +
      `💬 Get commands help: <a href="https://docs.ionbot.site/commands">Click here</a>\n`,
    parseMode: "html",
  });
};
