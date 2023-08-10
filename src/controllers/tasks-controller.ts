import { Request, Response } from "express";
import Task from "../models/Task";
import { TaskDTO } from "../dto/task.dto";
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
      const { tokenData, dataArr } = req.body;

      for (let i = 0; i < dataArr.length; i++) {
        const task = dataArr[i];

        if (!Types.ObjectId.isValid(task.id)) {
          Task.create({
            text: task.text,
            done: task.done,
            deadline: task.deadline,
            userId: tokenData.userId,
          });
        } else {
          const result = await Task.updateOne(
            { _id: new Types.ObjectId(task.id) },
            {
              $set: {
                text: task.text,
                done: task.done,
                deadline: task.deadline,
              },
            }
          ).exec();
          if (result.matchedCount === 0) {
            Task.create({
              text: task.text,
              done: task.done,
              deadline: task.deadline,
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
