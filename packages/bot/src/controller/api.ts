import { Request, Response, Router } from "express";
import { getLoadedModules, getUserBot } from "../api/ion";
import { createWorkMode } from "../api/workmode";

const apiRoutes = Router();

apiRoutes.get("/userbot", async (req: Request, res: Response) => {
  console.log(req.query);
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

export default apiRoutes;
