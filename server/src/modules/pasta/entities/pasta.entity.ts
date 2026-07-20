import { User } from 'src/modules/users/entities/user.entity';
import { File } from './file.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pasta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.pastas)
  owner: User;

  @Column({ nullable: true })
  text?: string;

  @Column({ length: 2048 })
  keywords: string;

  @OneToOne(() => File, (file) => file.pasta, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  file?: File;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
