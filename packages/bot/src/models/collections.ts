import { model, Schema } from "mongoose";

interface ICollections {
  name: string;
  chats: [any];
}

const schema = new Schema<ICollections>({
  name: String,
  chats: Array,
});

const Collections = model<ICollections>("Collections", schema);
export { Collections };
