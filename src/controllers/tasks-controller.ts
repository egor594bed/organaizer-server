import { Request, Response } from "express";
import Task from "../models/Task";
import { TaskDTO } from "../dto/taskDTO";
import { Document, Types } from "mongoose";

class NoteService {
  //Временное решение

  async getTasks(req: Request, res: Response) {
    try {
      const { tokenData } = req.body;

      const tasks: Array<typeof Task & Document> = await Task.find({
        userId: tokenData.userId,
      });

      //DTO
      const taskDTOsArray = tasks.map((task) => new TaskDTO(task));

      return res.status(200).json(taskDTOsArray);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error.message || "Что-то пошло не так!" });
    }
  }

  async saveTasks(req: Request, res: Response) {
    try {
      // Деструктуризация для исключения фронтового айдишника
      const { tokenData, text, done, deadline, id } = req.body;

      if (!Types.ObjectId.isValid(id)) {
        Task.create({
          text,
          done,
          deadline,
          userId: tokenData.userId,
        });
      } else {
        const result = await Task.updateOne(
          { _id: new Types.ObjectId(id) },
          { $set: { text, done, deadline } }
        ).exec();
        if (result.matchedCount === 0) {
          Task.create({
            text,
            done,
            deadline,
            userId: tokenData.userId,
          });
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
