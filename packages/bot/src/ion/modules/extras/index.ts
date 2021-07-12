import { NewMessageEvent } from "telegram/events";
import meta from "./meta";

import { GetChatID, GetUserID } from "./submodules/GetID";
import { PurgeMessages } from "./submodules/Purge";
import { GitHubRepo } from "./submodules/Source";

const ExtrasModule = async (event: NewMessageEvent, config?: any) => {
  const { text } = event.message;
  if (!text) return;

  try {
    const match = text.match(/^\.(\w+)?([\s\S+])?/);
    if (!match) return;

    switch (match[1]) {
      case "source":
        return GitHubRepo(event);
      case "chatid":
        return GetChatID(event);
      case "userid":
        return GetUserID(event);
      case "purge":
        return PurgeMessages(event);
    }
  } catch (e) {}
};

export default {
  handler: ExtrasModule,
  meta,
};
