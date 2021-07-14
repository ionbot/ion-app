import { Api } from "telegram";
import IonHandler from "../../core/IonHandler";

export default new IonHandler(
  (client, event, config) => {
    const { text } = event.message;
    const match = text.match(/^\.(\w+)(.*)?/m);
    console.log("match", match);
  },
  { commands: "search" }
);
