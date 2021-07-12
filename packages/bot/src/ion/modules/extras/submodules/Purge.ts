import { Api } from "telegram";
import { NewMessageEvent } from "telegram/events";

export const PurgeMessages = (event: NewMessageEvent) => {
  const { replyToMsgId } = event.message;
  const { id } = event.message;
  if (replyToMsgId) {
    for (let i = id; i >= replyToMsgId; i--) {
      try {
        event.client
          ?.invoke(
            new Api.channels.DeleteMessages({
              channel: event.chatId,
              id: [i],
            })
          )
          .catch((err) => {
            //todo: add to error log
          });
      } catch (e) {}
    }

    // console.log("messageId", JSON.stringify(messageId));
  } else {
    event.message.edit({ text: `❌ Please reply to a message.` });
  }
};
