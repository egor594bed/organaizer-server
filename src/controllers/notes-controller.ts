import { Request, Response } from "express";
import NoteGroup from "../models/NoteGroup";
import { NoteGroupDTO } from "../dto/noteGroup.dto";
import { Document } from "mongoose";

class NoteService {
  //Временное решение, вынести в сераис

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
      const { tokenData, dataArr } = req.body;

      for (let i = 0; i < dataArr.length; i++) {
        const noteGroup = dataArr[i];

        if (noteGroup.id) {
          NoteGroup.create({
            groupName: noteGroup.groupName,
            notes: noteGroup.notes,
            userId: tokenData.userId,
          });
        } else {
          await NoteGroup.updateOne(
            { _id: noteGroup._id },
            { $set: { notes: noteGroup.notes } }
          ).exec();
        }
      }

      return res.status(201).json("Сохранено");
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error.message || "Что-то пошло не так!" });
    }
  }

  async deleteNotes(req: Request, res: Response) {
    try {
      const notesGroupId = req.query.id;
      console.log(notesGroupId);
      await NoteGroup.deleteOne({ _id: notesGroupId });

      return res.status(201).json("Удалено");
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error.message || "Что-то пошло не так!" });
    }
  }
}

export default new NoteService();
