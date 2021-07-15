import { Request, Response, Router } from "express";
import { getLoadedModules, getUserBot } from "../api/ion";
import { createWorkMode, delWorkMode, getWorkMode } from "../api/workmode";
import socket from "../ion/socket";

const apiRoutes = Router();

apiRoutes.get("/userbot", async (req: Request, res: Response) => {
  const { token } = req.query;
  const user = await getUserBot(String(token));
  res.json(user);
});

apiRoutes.get("/modules/active", async (req: Request, res: Response) => {
  const loadedModules = await getLoadedModules();
  res.json(loadedModules);
});

//  Work Mode

const EmitWorkMode = async (socket: any) => {
  const workMode = await getWorkMode();
  socket.emit("fetch-workmode", workMode);
};

socket.on("connection", async (socket) => {
  socket.on("create-workmode", async (workmode) => {
    await createWorkMode(workmode);
    EmitWorkMode(socket);
  });

  socket.on("delete-workmode", async (id) => {
    await delWorkMode(id);
    socket.emit("delete-worknmode");
    EmitWorkMode(socket);
  });

  socket.on("fetch-workmode", async () => {
    EmitWorkMode(socket);
  });
});

export default apiRoutes;
