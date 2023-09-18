import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "./task.model";

@Controller("tasks")
export class TaskController {
  constructor(private taskService: TaskService) {}

  //Гвард с айдишником юзера
  @Get("getTasks")
  getTasks() {
    return this.taskService.getTasks();
  }

  @Post("createTask")
  createTask(@Body() newTaskData: Task) {
    return this.taskService.createTask(newTaskData);
  }

  @Patch("updateTask")
  updateTask(
    @Body() updateTaskData: { taskId: string; updateTaskFields: Task },
  ) {
    return this.taskService.updateTask(updateTaskData);
  }

  @Delete("deleteTask")
  deleteTask(@Query("taskId") taskId: string) {
    return this.taskService.deleteTask(taskId);
  }
}
