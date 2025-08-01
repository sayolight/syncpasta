import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OAuthClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  redirectUri: string;

  @Column()
  clientId: string;

  @Column()
  clientSecret: string;
}
