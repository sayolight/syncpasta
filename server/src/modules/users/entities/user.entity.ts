import { Pasta } from 'src/modules/pasta/entities/pasta.entity';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  uid: string;

  @OneToMany(() => Pasta, (pasta) => pasta.owner)
  pastas: Pasta[];
}
