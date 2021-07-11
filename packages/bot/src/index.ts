import env from "./env";

import "./ion/setup";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import serveStatic from "serve-static";
import apiRoutes from "./controller/api";
import { connect } from "mongoose";
import io from "./ion/socket";

try {
  // Try to connect to MongoDB

  connect(env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (e) {
  console.log("Error connecting to database");
  console.log(e);
  process.exit(0);
}
/** Express Server */
const server = express();
server.use(cors());
server.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
server.use(
  morgan("dev", {
    skip: (req, res) => env.isProd && res.statusCode < 500,
  })
);
server.use(express.json());

// API Route
server.use("/api", apiRoutes);

/** serve dashboard folder only in production */

if (env.NODE_ENV !== "development") {
  const dashboard = path.join(__dirname, "/dashboard");
  server.use(serveStatic(dashboard));
  server.get("*", async (req, res) => {
    res.sendFile(dashboard + "/index.html");
  });
}

// Middlewares
// server.use(errorHandlers.notFoundHandler);
// server.use(errorHandlers.errorHandler);

const Start = () => {
  const _s = server.listen(env.PORT, () => {
    console.log(`Dashboard is running on port: ${env.PORT}`);
  });

  io.listen(_s);
};

if (env.NODE_ENV === "development") {
  Start();
}

module.exports = {
  start: () => {
    Start();
  },
};
