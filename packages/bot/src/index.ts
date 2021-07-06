import env from "./env";

import "./ion/setup";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import serveStatic from "serve-static";
import apiRoutes from "./controller/api";

const { NODE_ENV } = process.env;

// import * as errorHandlers from "./middlewares/errors";

/** Express Server */
const app = express();
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(
  morgan("dev", {
    skip: (req, res) => env.isProd && res.statusCode < 500,
  })
);
app.use(express.json());

// API Route
app.use("/api", apiRoutes);

/** serve dashboard folder only in production */

if (NODE_ENV !== "development") {
  const dashboard = path.join(__dirname + "/../build/dashboard");
  app.use(serveStatic(dashboard));
  app.get("*", async (req, res) => {
    res.sendFile(dashboard + "/index.html");
  });
}

// Middlewares
// app.use(errorHandlers.notFoundHandler);
// app.use(errorHandlers.errorHandler);

app.listen(env.PORT, () => console.log("Listening on port", env.PORT));
