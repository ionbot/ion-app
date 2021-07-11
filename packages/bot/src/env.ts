import dotenv from "dotenv";
import { cleanEnv, port, str } from "envalid";

dotenv.config();

export default cleanEnv(process.env, {
  PORT: port({ default: 4200 }),
  NODE_ENV: str({ default: "production" }),
  MONGO: str({ default: "mongodb://localhost/ion" }),
});
