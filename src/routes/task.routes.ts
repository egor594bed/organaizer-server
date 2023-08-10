import { Router, Request, Response } from "express";
import authMiddleware from "../middlewares/auth-middleware";
import tasksController from "../controllers/tasks-controller";
const router = Router();

module.exports = router;

router.get("/getData", authMiddleware, async (req: Request, res: Response) =>
  tasksController.getTasks(req, res)
);

router.post("/saveData", authMiddleware, async (req: Request, res: Response) =>
  tasksController.saveTasks(req, res)
);
