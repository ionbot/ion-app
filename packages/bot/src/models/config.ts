import { model, Schema } from "mongoose";

interface IConfig {
  module: string;
  values: object;
}

const schema = new Schema<IConfig>({
  module: {
    type: String,
    unique: true,
  },
  values: {
    type: JSON,
    default: {},
  },
});

const Config = model<IConfig>("Configs", schema);
export { Config };
