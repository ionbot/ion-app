import { NewMessageEvent } from "telegram/events";
import VERSION from "../../../../version";

export const GitHubRepo = (event: NewMessageEvent) => {
  event.message.edit({
    text: `<a href="https://github.com/ionbot/ion-app">Source Ion v(${VERSION})</a>`,
    parseMode: "html",
  });
};
