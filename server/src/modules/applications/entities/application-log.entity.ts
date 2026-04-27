import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Application } from './application.entity';

export enum ApplicationLogType {
  PASTA_QUERY = 'pasta_query',
  PASTA_CREATE = 'pasta_create',
  PASTA_UPDATE = 'pasta_update',
  PASTA_REMOVE = 'pasta_delete',
}

@Entity()
export class ApplicationLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Application, (application) => application.logs)
  application: Application;

  @Column({
    type: 'enum',
    enum: ApplicationLogType,
  })
  type: ApplicationLogType;

  @Column({ type: 'json' })
  meta: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
