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
      description: "Enable this to display the latency along in the message",
      type: "switch",
    },
    extra: {
      info: "Extra Message",
      description: "You can extra message in the response for ping command",
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
