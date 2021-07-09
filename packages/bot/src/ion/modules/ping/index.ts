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
        "If you want latency to be displayed with the message enabled this.",
      type: "switch",
    },
    extra: {
      info: "Extra Message",
      description:
        "This will add the provided text at the latest of ping response.",
      type: "text",
    },
  },
};

const PingModule = async (event: NewMessageEvent, config?: any) => {
  let extra = config.extra || "";

  const time = Date.now();
  await event.client?.sendMessage("me", { message: "..." }); // send message to pm
  const diff = Date.now() - time;

  const latency = `🕔 Latency: **${
    diff / 2 // haha
  }ms**\n`;

  let text = `🚀 Ion v${VERSION} is up and running.\n`;

  text += config.showLatency ? latency : "";
  text += config.extra ? extra : "";

  await event.message.edit({
    text,
    parseMode: "markdown",
  });
};

export default {
  handler: PingModule,
  meta,
};
