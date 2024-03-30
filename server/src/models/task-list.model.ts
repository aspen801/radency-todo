import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('task_lists')
export class TaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
