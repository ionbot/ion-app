import { model, Schema } from "mongoose";

interface IModuleConfigs {
  module: string;
  values: object;
}

const schema = new Schema<IModuleConfigs>({
  module: {
    type: String,
    unique: true,
  },
  values: {
    type: JSON,
    default: {},
  },
});

const ModuleConfigs = model<IModuleConfigs>("ModuleConfigs", schema);
export { ModuleConfigs };
