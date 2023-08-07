import { Request, Response } from "express";
import Task from "../models/Task";

class NoteService {
  async getTasks(req: Request, res: Response) {
    const { tokenData } = req.body;

    const notes = await Task.findOne({ userId: tokenData.userId });

    return res.json(notes);
  }
}

export default new NoteService();
