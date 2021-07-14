import { model, Schema } from "mongoose";

interface IIonConfig {
  key: string;
  value: string;
}

const schema = new Schema<IIonConfig>({
  key: {
    type: String,
    unique: true,
  },
  value: String,
});

const IonConfig = model<IIonConfig>("IonConfig", schema);
export { IonConfig };
