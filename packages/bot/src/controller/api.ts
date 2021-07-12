import { Request, Response, Router } from "express";
import { getLoadedModules, getUserBot } from "../api/ion";

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

export default apiRoutes;
