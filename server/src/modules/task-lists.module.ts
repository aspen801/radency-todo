import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListsController } from '../controllers/task-lists.controller';
import { TaskListsService } from '../services/task-lists.service';
import { TaskList } from '../models/task-list.model';
import { TasksModule } from './tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList]), TasksModule],
  controllers: [TaskListsController],
  providers: [TaskListsService],
})
export class TaskListsModule {}
