import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pasta } from './pasta.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @OneToOne(() => Pasta, (pasta) => pasta.file)
  pasta: Pasta;
}
