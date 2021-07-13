import { model, Schema } from "mongoose";

interface ICommands {
  name: string;
  match: string;
  scope: "all" | "private" | "group" | "channel";
  mode: "all" | "incoming" | "outgoing";
  actions: any[];
}

const schema = new Schema<ICommands>({
  name: String,
  match: String,
  scope: String,
  mode: String,
  actions: {
    type: Object,
    default: [],
  },
});

const Commands = model<ICommands>("Commands", schema);
export { Commands };
