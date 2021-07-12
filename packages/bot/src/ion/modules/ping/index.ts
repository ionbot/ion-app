import { NewMessageEvent } from "telegram/events";
import VERSION from "../../../version";

import meta from "./meta";

const PingModule = async (event: NewMessageEvent, config?: any) => {
  let extra = config.extra || "";

  const time = Date.now();
  await event.message.edit({ text: "..." });

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
