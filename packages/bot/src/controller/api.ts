import { Request, Response, Router } from "express";
import { getLoadedModules, getUserBot } from "../api/ion";
import { createWorkMode, delWorkMode, getWorkMode } from "../api/workmode";

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

apiRoutes.post("/workmode", async (req: Request, res: Response) => {
  await createWorkMode(req.body);
  res.json();
});

apiRoutes.get("/workmode", async (req: Request, res: Response) => {
  const workModes = await getWorkMode();
  console.log("workModes", workModes);
  res.json(workModes);
});

apiRoutes.delete("/workmode", async (req: Request, res: Response) => {
  const id: string = String(req.query.id);

  await delWorkMode(id);
  res.json();
});

export default apiRoutes;
