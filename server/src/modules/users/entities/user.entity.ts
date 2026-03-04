import { Pasta } from 'src/modules/pasta/entities/pasta.entity';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Application } from '../../applications/entities/application.entity';

@Entity()
export class User {
  @PrimaryColumn()
  uid: string;

  @OneToMany(() => Pasta, (pasta) => pasta.owner)
  pastas: Pasta[];

  @OneToMany(() => Application, (application) => application.owner)
  apiKeys: Application[];
}
