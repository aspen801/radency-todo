import { Controller, Get, Param, Post, Body } from '@nestjs/common';
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
}
