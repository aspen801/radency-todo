import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListsController } from '../controllers/task-lists.controller';
import { TaskListsService } from '../services/task-lists.service';
import { TaskList } from '../models/task-list.model';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList])],
  controllers: [TaskListsController],
  providers: [TaskListsService],
})
export class TaskListsModule {}
