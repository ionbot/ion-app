import IonHandler from "../../core/IonHandler";

export default new IonHandler(
  (client, event, config) => {
    event.message.edit({ text: "test" });
  },
  { match: /.*/ }
);
