import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pasta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.pastas)
  owner: User;

  @Column({ nullable: true })
  fileUrl?: string;

  @Column({ nullable: true })
  text?: string;

  @Column({ length: 2048 })
  description: string;
}
