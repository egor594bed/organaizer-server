import { Request, Response } from "express";
import Task from "../models/Task";
import { TaskDTO } from "../dto/task.dto";
import { Document } from "mongoose";

class NoteService {
  //Временное решение, вынести в сераис

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

        if (task.id) {
          Task.create({
            text: task.text,
            done: task.done,
            deadline: task.deadline,
            userId: tokenData.userId,
          });
        } else {
          await Task.updateOne(
            { _id: task._id },
            {
              $set: {
                text: task.text,
                done: task.done,
                deadline: task.deadline,
              },
            }
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

  async deleteTasks(req: Request, res: Response) {
    try {
      const tasksGroupId = req.query.id;

      await Task.deleteOne({ _id: tasksGroupId });

      return res.status(201).json("Удалено");
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error.message || "Что-то пошло не так!" });
    }
  }
}

export default new NoteService();
