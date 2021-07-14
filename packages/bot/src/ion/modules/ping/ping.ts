import VERSION from "../../../version";
import IonHandler from "../../core/IonHandler";

export default new IonHandler(
  async (client, event, config) => {
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
  },
  { commands: "ping" }
);
