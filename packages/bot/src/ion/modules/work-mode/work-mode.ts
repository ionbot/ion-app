import * as ionConfig from "../../providers/ion-config";
import { WorkMode } from "../../../models/workmode";
import IonHandler from "../../core/IonHandler";

let activeModeText: string | null,
  modes = [];

async function loadWorkModes() {
  modes = await WorkMode.find();
}

async function init() {
  activeModeText = await ionConfig.get("active-work");
  console.log("activeModeText", activeModeText);
}

const MessageHandler = new IonHandler(
  async (client, event, config) => {
    console.log("event.message.mentioned", event.message.mentioned);
    console.log(activeModeText);
    if (event.message.mentioned) {
      event.message.reply({ message: activeModeText || "At work." });
    }
  },
  {
    match: /.*/,
    scope: "all",
    mode: "incoming",
  }
);

const Command = new IonHandler(
  async (client, event, config) => {
    const match = event.message.text.match(/^\.work (\w+)/i);
    if (!match) return;
    await loadWorkModes(); // load each modes first

    const modeName = match[1] || "";
    const modeData = await WorkMode.findOne({ name: modeName });
    if (modeData) {
      await ionConfig.set("active-work", modeName);
    }
  },
  { match: "work" }
);

init();
export default [Command, MessageHandler];
