import { NewMessageEvent } from "telegram/events";
import { ModuleMeta } from "..";
import VERSION from "../../../version";

const meta: ModuleMeta = {
  match: "ping",
  scope: "all",
  mode: "outgoing",
};

const PingModule = async (event: NewMessageEvent) => {
  await event.message.reply({
    message: `🚀 Ion (v${VERSION}) is up and running.`,
    replyTo: 0,
  });
};

export default {
  handler: (config?: object) => {
    return PingModule;
  },
  ...meta,
};
