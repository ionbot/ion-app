import { Request, Response, Router } from "express";
import { getUserBot } from "../api/ion";

const apiRoutes = Router();

apiRoutes.get("/userbot", async (req: Request, res: Response) => {
  const user = await getUserBot();

  res.json(user);
});

export default apiRoutes;
