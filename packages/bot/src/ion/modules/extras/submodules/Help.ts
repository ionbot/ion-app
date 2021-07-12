import { NewMessageEvent } from "telegram/events";

export const Help = (event: NewMessageEvent) => {
  event.message.edit({
    text:
      `<a href="https://docs.ionbot.site">Lern about Ion.</a>\n` +
      `<a href="https://docs.ionbot.site/commands">Commands</a>\n`,
    parseMode: "html",
  });
};
