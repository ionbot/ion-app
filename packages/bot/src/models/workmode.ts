import { model, Schema } from "mongoose";

export interface IWorkMode {
  name: string;
  time: string;
  message: String;
  command?: string;
  settings: object;
}

const schema = new Schema<IWorkMode>({
  name: String,
  time: String,
  command: String,
  message: String,
  settings: {
    type: Object,
    default: {},
  },
});

const WorkMode = model<IWorkMode>("WorkMode", schema);
export { WorkMode };
