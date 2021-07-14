import { Api } from "telegram";
import IonHandler from "../../core/IonHandler";

export default new IonHandler(
  (client, event, config) => {
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
              // TODO: Add to error log
            });
        } catch (e) {}
      }

      // console.log("messageId", JSON.stringify(messageId));
    } else {
      event.message.edit({ text: `❌ Please reply to a message.` });
    }
  },
  { commands: "purge" }
);
