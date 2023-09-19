import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
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
import { CreateTaskDto } from "./dto/createTaskDto";
import { Task } from "./task.model";

@ApiTags("Задачи")
@Controller("tasks")
export class TaskController {
  constructor(private taskService: TaskService) {}

  //Гвард с айдишником юзера
  @Get("getTasks")
  getTasks() {
    return this.taskService.getTasks();
  }

  @ApiOperation({ summary: "Создание задачи" })
  @ApiResponse({ type: Task })
  @Post("createTask")
  createTask(@Body() newTaskData: CreateTaskDto) {
    return this.taskService.createTask(newTaskData);
  }

  @ApiOperation({ summary: "Обновление задачи" })
  @ApiResponse({ type: Task })
  @Patch("updateTask")
  updateTask(
    @Body() updateTaskData: { taskId: string; updateTaskFields: CreateTaskDto },
  ) {
    return this.taskService.updateTask(updateTaskData);
  }

  @ApiOperation({ summary: "Удаление задачи" })
  @Delete("deleteTask")
  deleteTask(@Query("taskId") taskId: string) {
    return this.taskService.deleteTask(taskId);
  }
}
