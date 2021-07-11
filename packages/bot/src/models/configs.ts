import { model, Schema } from "mongoose";

interface IConfigs {
  key: string;
  value: object;
}

const schema = new Schema<IConfigs>({
  key: {
    type: String,
    unique: true,
  },
  value: String,
});

const Configs = model<IConfigs>("Configs", schema);
export { Configs };
