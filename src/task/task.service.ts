import { Injectable } from "@nestjs/common";
import { Task } from "./task.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateTaskDto } from "./dto/createTaskDto";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  updateTask(updateTaskData: {
    taskId: string;
    updateTaskFields: CreateTaskDto;
  }) {
    return this.taskRepository.update(updateTaskData.updateTaskFields, {
      where: { taskId: updateTaskData.taskId },
    });
  }

  deleteTask(taskId: string) {
    return this.taskRepository.destroy({ where: { taskId } });
  }

  createTask(newTaskData: CreateTaskDto) {
    return this.taskRepository.create(newTaskData);
  }

  getTasks() {
    return this.taskRepository.findAll();
  }
}
