import VERSION from "../../../version";
import IonHandler from "../../core/IonHandler";

export default new IonHandler(
  (client, event, config) => {
    event.message.edit({
      text: `<a href="https://github.com/ionbot/ion-app">Source Ion v(${VERSION})</a>`,
      parseMode: "html",
    });
  },
  { commands: "source" }
);
