import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware";
import tasksController from "../controllers/tasks-controller";
const router = Router();

module.exports = router;

router.get("/getData", authMiddleware, tasksController.getTasks);

router.post("/saveData", authMiddleware, tasksController.saveTasks);

router.delete("/deleteData", authMiddleware, tasksController.deleteTasks);
