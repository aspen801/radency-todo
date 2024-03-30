import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  due_date: Date;

  @Column()
  priority: 'low' | 'medium' | 'high';

  @Column()
  list_id: number;
}
