import { Injectable } from '@nestjs/common';
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
}
