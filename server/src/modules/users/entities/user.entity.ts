import { Pasta } from 'src/modules/pasta/entities/pasta.entity';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ApiKey } from '../../api-key/entities/api-key.entity';

@Entity()
export class User {
  @PrimaryColumn()
  uid: string;

  @OneToMany(() => Pasta, (pasta) => pasta.owner)
  pastas: Pasta[];

  @OneToMany(() => ApiKey, (apiKey) => apiKey.owner)
  apiKeys: ApiKey[];
}
