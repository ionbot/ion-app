import { model, Schema } from "mongoose";

interface IUsers {
  userId: number;
  apiId: number;
  apiHash: string;
  session: string;
}

const schema = new Schema<IUsers>({
  userId: {
    type: Number,
    unique: true,
  },
  apiId: {
    type: Number,
    required: true,
  },
  apiHash: String,
  session: {
    type: String,
    required: true,
  },
});

const Users = model<IUsers>("Users", schema);
export { Users };
