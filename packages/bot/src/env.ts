import dotenv from "dotenv";
import { cleanEnv, port, str } from "envalid";

dotenv.config();

export default cleanEnv(process.env, {
  PORT: port({ default: 4200 }),
  MONGO: str({ default: "mongodb://localhost:27017/ion" }),
});
