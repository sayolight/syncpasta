import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { FirebaseModule } from './firebase/firebase.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    DatabaseModule,
    FirebaseModule,
    StorageModule,
  ],
})
export class CoreModule {}
