import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pasta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.pastas)
  owner: User;

  @Column()
  fileUrl: string;

  @Column({ length: 256 })
  description: string;
}
