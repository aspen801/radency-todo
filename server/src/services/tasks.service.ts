import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../models/task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getByListId(list_id: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { list_id } });
  }

  async create(taskData: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(taskData);
    return this.taskRepository.save(newTask);
  }

  async update(taskId: number, taskData: Partial<Task>): Promise<Task> {
    const task = await this.taskRepository.preload({
      id: taskId,
      ...taskData,
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }
    return this.taskRepository.save(task);
  }

  async delete(taskId: number): Promise<void> {
    const result = await this.taskRepository.delete(taskId);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }
  }

  async deleteTasksByListId(listId: number): Promise<void> {
    await this.taskRepository.delete({ list_id: listId });
  }

  async move(taskId: number, newListId: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }

    task.list_id = newListId;
    return this.taskRepository.save(task);
  }
}
