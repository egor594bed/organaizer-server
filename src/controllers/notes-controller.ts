import { Request, Response } from "express";
import NoteGroup from "../models/NoteGroup";
import { NoteGroupDTO } from "../dto/noteGroupDTO";
import { Document, Types } from "mongoose";

class NoteService {
  //Временное решение

  async getNotes(req: Request, res: Response) {
    try {
      const { tokenData } = req.body;

      const notes: Array<typeof NoteGroup & Document> = await NoteGroup.find({
        userId: tokenData.userId,
      });

      //DTO
      const noteDTOsArray = notes.map(
        (noteGroup) => new NoteGroupDTO(noteGroup)
      );

      return res.status(200).json(noteDTOsArray);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error.message || "Что-то пошло не так!" });
    }
  }

  async saveNotes(req: Request, res: Response) {
    try {
      // Деструктуризация для исключения фронтового айдишника
      const { tokenData, noteGroupsArr } = req.body;

      for (let i = 0; i < noteGroupsArr.length; i++) {
        const noteGroup = noteGroupsArr[i];

        if (!Types.ObjectId.isValid(noteGroup.id)) {
          NoteGroup.create({
            groupName: noteGroup.groupName,
            notes: noteGroup.notes,
            userId: tokenData.userId,
          });
        } else {
          const result = await NoteGroup.updateOne(
            { _id: new Types.ObjectId(noteGroup.id) },
            { $set: { notes: noteGroup.notes } }
          ).exec();
          if (result.matchedCount === 0) {
            NoteGroup.create({
              groupName: noteGroup.groupName,
              notes: noteGroup.notes,
              userId: tokenData.userId,
            });
          }
        }
      }

      return res.status(201).json("Сохранено");
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error.message || "Что-то пошло не так!" });
    }
  }
}

export default new NoteService();
