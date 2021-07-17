import IonHandler from "../../core/IonHandler";

const Activator = new IonHandler(
  async (client, event, config) => {
    const match = event.message.text.match(/^\Safk (.*)/);
    if (!match) return;

    const reason = match[1];
    event.message.reply({ message: reason });
  },
  { commands: "afk", mode: "outgoing", scope: "all" }
);

export default [Activator];
