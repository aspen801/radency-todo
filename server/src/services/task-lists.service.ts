import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { TaskList } from '../models/task-list.model';
import { Task } from '../models/task.model';

@Injectable()
export class TaskListsService {
  constructor(
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,

    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    private readonly taskService: TasksService,
  ) {}

  async getAll(): Promise<TaskList[]> {
    return this.taskListRepository.find();
  }

  async getById(id: number): Promise<TaskList | undefined> {
    return this.taskListRepository.findOneBy({ id });
  }

  async getTasksCount(list_id: number): Promise<number> {
    return await this.taskRepository.count({ where: { list_id } });
  }

  async create(taskList: TaskList): Promise<TaskList> {
    return this.taskListRepository.save(taskList);
  }

  async update(id: number, taskListData: Partial<TaskList>): Promise<TaskList> {
    const taskList = await this.taskListRepository.preload({
      id,
      ...taskListData,
    });

    if (!taskList) {
      throw new NotFoundException(`TaskList with ID ${id} not found.`);
    }

    return this.taskListRepository.save(taskList);
  }

  async delete(id: number): Promise<void> {
    const existingTaskList = await this.taskListRepository.findOneBy({ id });
    if (!existingTaskList) {
      throw new NotFoundException(`TaskList with ID ${id} not found.`);
    }

    await this.taskService.deleteTasksByListId(id);

    const result = await this.taskListRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`TaskList with ID ${id} not found.`);
    }
  }
}
