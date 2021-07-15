import * as ionConfig from "../../providers/ion-config";
import { WorkMode } from "../../../models/workmode";
import IonHandler from "../../core/IonHandler";

let activeMode: any = null,
  modes = [];

async function loadWorkModes() {
  modes = await WorkMode.find();
}

async function init() {
  const active = await ionConfig.get("active-work");
  if (active) {
    activeMode = await WorkMode.findOne({ name: active });
  }
}

const MessageHandler = new IonHandler(
  async (client, event) => {
    if (event.message.mentioned) {
      // check if active mode is set or not
      if (activeMode) {
        const autoReply = await event.message.reply({
          message: activeMode.message || "At work.",
        });
      }
    }
  },
  {
    match: /.*/,
    scope: "all",
    mode: "incoming",
  }
);

const SelfTextHandler = new IonHandler(
  async (client, event) => {
    if (!activeMode) return;

    // if time is set in activeMode, skip this
    if (activeMode.time) return;
    await ionConfig.set("active-work", "");
    activeMode = null;
    event.message.reply({ message: `Work mode has been disabled.` });
  },
  {
    match: /.*/,
    scope: "all",
    mode: "outgoing",
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
      activeMode = modeData;
      await ionConfig.set("active-work", modeName);
      event.message.edit({ text: `Actived work mode: ${modeName}` });
    }
  },
  { match: "work" }
);

init();
export default [Command, MessageHandler, SelfTextHandler];
