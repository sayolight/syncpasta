import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OAuthCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  expiresAt: Date;

  // code: string;
  // userId: string;
  // clientId: string;
  // expiresAt: Date;
}
