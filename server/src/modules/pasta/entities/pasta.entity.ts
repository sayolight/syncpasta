import { User } from 'src/modules/users/entities/user.entity';
import { File } from './file.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
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
}
