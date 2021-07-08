import { NewMessageEvent } from "telegram/events";
import { ModuleMeta } from "..";
import VERSION from "../../../version";

const meta: ModuleMeta = {
  name: "Ping",
  description:
    "Just to check if your bot is alive or not, shows Ion version also.",
  slug: "ping",

  match: "ping",
  scope: "all",
  mode: "outgoing",

  config: {
    showLatency: {
      info: "Display Latency",
      description:
        "If you want latency to be displayed with the message enabled this",
      type: "switch",
    },
    extra: {
      info: "Extra Message",
      description:
        "This will add the provided text at the latest of ping response",
      type: "text",
    },
  },
};

const PingModule = async (event: NewMessageEvent, config?: object) => {
  const time = Date.now();
  await event.client?.sendMessage("me", { message: "..." }); // send message to pm
  const diff = Date.now() - time;
  await event.message.edit({
    text: `🚀 Ion v${VERSION} is up and running.\n🕔 Latency: **${
      diff / 2 // haha
    }ms**`,
    parseMode: "markdown",
  });
};

export default {
  handler: PingModule,
  meta,
};
