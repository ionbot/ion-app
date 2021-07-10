import { NewMessageEvent } from "telegram/events";
import { ModuleMeta } from "..";
import VERSION from "../../../version";

const meta: ModuleMeta = require("./meta.json");

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
