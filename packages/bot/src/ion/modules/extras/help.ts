import IonHandler from "../../core/IonHandler";

export default new IonHandler(
  (client, event, config) => {
    event.message.edit({
      text:
        `🚀 Learn about Ion: <a href="https://docs.ionbot.site">Click here</a>\n` +
        `💬 Get commands help: <a href="https://docs.ionbot.site/commands">Click here</a>\n`,
      parseMode: "html",
    });
  },
  { commands: "help" }
);
