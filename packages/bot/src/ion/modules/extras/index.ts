import { NewMessageEvent } from "telegram/events";
import meta from "./meta";

import { Help } from "./submodules/Help";
import { PurgeMessages } from "./submodules/Purge";
import { GetChatID, GetUserID } from "./submodules/GetID";
import { GitHubRepo } from "./submodules/Source";
import { GetTime } from "./submodules/Time";

const ExtrasModule = async (event: NewMessageEvent, config?: any) => {
  const { text } = event.message;
  if (!text) return;

  try {
    const match = text.match(/^\.(\w+)(.*)?/m);
    if (!match) return;

    const [, command, ...params] = match;

    switch (command) {
      case "source":
        return GitHubRepo(event);
      case "chatid":
        return GetChatID(event);
      case "userid":
        return GetUserID(event);
      case "purge":
        return PurgeMessages(event);
      case "city":
        return GetTime(event, params);
      case "help":
        return Help(event);
    }
  } catch (e) {}
};

export default {
  handler: ExtrasModule,
  meta,
};
