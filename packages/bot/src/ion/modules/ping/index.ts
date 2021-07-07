import { NewMessageEvent } from "telegram/events";
import { ModuleMeta } from "..";
import VERSION from "../../../version";

const meta: ModuleMeta = {
  match: "ping",
  scope: "all",
  mode: "outgoing",
};

const PingModule = async (event: NewMessageEvent, config?: object) => {
  const time = Date.now();
  await event.client?.sendMessage("me", { message: "..." }); // send message to pm
  const diff = Date.now() - time;
  event.client?.editMessage(event.message.peerId, {
    message: event.message.id,
    text: `🚀 Ion v${VERSION} is up and running.\n🕔 Latency: **${
      diff / 2 // haha
    }ms**`,
    parseMode: "markdown",
  });
};

export default {
  handler: PingModule,
  ...meta,
};
