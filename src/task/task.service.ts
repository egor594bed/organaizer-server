import { Injectable } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TaskService {
  updateTask(updateTaskData: { taskId: string; updateTaskData: Task }) {
    throw new Error("Method not implemented.");
  }
  deleteTask(taskId: string) {
    throw new Error("Method not implemented.");
  }
  createTask(newTaskData: Task) {
    throw new Error("Method not implemented.");
  }
  getTasks() {
    throw new Error("Method not implemented.");
  }
}
