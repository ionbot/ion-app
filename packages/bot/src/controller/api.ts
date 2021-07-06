import { Request, Response, Router } from "express";
import { getUser } from "../api/ion";

const apiRoutes = Router();

apiRoutes.get("/user", async (req: Request, res: Response) => {
  const user = await getUser();

  res.json(user);
});

export default apiRoutes;
