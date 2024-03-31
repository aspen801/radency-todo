import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { TaskListsService } from '../services/task-lists.service';
import { TaskList } from '../models/task-list.model';

@Controller('task-lists')
export class TaskListsController {
  constructor(private readonly taskListsService: TaskListsService) {}

  @Get('/')
  async getAllTaskLists(): Promise<TaskList[]> {
    return this.taskListsService.getAll();
  }

  @Get(':id/tasks/count')
  async getTasksCount(@Param('id') listId: number): Promise<{ count: number }> {
    const count = await this.taskListsService.getTasksCount(listId);
    return { count };
  }

  @Post('/create')
  async createTaskList(@Body() taskList: TaskList): Promise<TaskList> {
    return this.taskListsService.create(taskList);
  }

  @Patch('/update/:id')
  async updateTaskList(
    @Param('id') id: string,
    @Body() taskListData: Partial<TaskList>,
  ): Promise<TaskList> {
    return this.taskListsService.update(parseInt(id), taskListData);
  }

  @Delete('/delete/:id')
  async deleteTaskList(@Param('id') id: string): Promise<void> {
    return this.taskListsService.delete(parseInt(id));
  }
}
