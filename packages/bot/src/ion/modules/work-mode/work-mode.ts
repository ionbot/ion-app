import IonHandler from "../../core/IonHandler";

export default new IonHandler(
  async (client, event, config) => {
    console.log(event.message.text);
  },
  { match: "work" }
);
