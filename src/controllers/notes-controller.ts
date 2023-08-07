import { Request, Response } from "express";
import NoteGroup from "../models/NoteGroup";

class NoteService {
  async getNotes(req: Request, res: Response) {
    const { tokenData } = req.body;

    const notes = await NoteGroup.findOne({ userId: tokenData.userId });

    return res.json(notes);
  }
}

export default new NoteService();
