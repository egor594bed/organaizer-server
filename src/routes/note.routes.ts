import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware";
import notesController from "../controllers/notes-controller";
const router = Router();

module.exports = router;

router.get("/getData", authMiddleware, notesController.getNotes);

router.post("/saveData", authMiddleware, notesController.saveNotes);

router.delete("/deleteData", authMiddleware, notesController.deleteNotes);
