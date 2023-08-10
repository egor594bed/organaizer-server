import { Router, Request, Response } from "express";
import userAuthService from "../controllers/user-auth-controller";
import authMiddleware from "../middlewares/auth-middleware";
import noteController from "../controllers/notes-controller";
const router = Router();

module.exports = router;

router.get("/getData", authMiddleware, async (req: Request, res: Response) =>
  noteController.getNotes(req, res)
);

router.post("/saveData", authMiddleware, async (req: Request, res: Response) =>
  noteController.saveNotes(req, res)
);
