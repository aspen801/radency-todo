import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Post,
  Body,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/')
  getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAll();
  }

  @Get('/:list_id')
  getTasksByListId(@Param('list_id') list_id: string): Promise<Task[]> {
    return this.tasksService.getByListId(+list_id);
  }

  @Post('/create')
  createTask(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.tasksService.create(taskData);
  }

  @Patch('/update/:id')
  updateTask(
    @Param('id') id: string,
    @Body() taskData: Partial<Task>,
  ): Promise<Task> {
    return this.tasksService.update(parseInt(id), taskData);
  }

  @Delete('/delete/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.delete(parseInt(id));
  }

  @Patch('/:taskId/move/:newListId')
  async moveTask(
    @Param('taskId') taskId: string,
    @Param('newListId') newListId: string,
  ): Promise<Task> {
    return this.tasksService.move(parseInt(taskId), parseInt(newListId));
  }
}
