import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { FirebaseModule } from './firebase/firebase.module';
import { PastaModule } from '../modules/pasta/pasta.module';
import { UsersModule } from '../modules/users/users.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    DatabaseModule,
    FirebaseModule,
    PastaModule,
    UsersModule,
    StorageModule,
  ],
})
export class CoreModule {}
