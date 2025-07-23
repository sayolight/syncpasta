import { Module } from '@nestjs/common';
import { PastaService } from './pasta.service';
import { PastaController } from './pasta.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { pastaProviders } from './pasta.providers';
import { FirebaseModule } from 'src/core/firebase/firebase.module';
import { StorageModule } from '../../core/storage/storage.module';

@Module({
  imports: [DatabaseModule, FirebaseModule, StorageModule],
  controllers: [PastaController],
  providers: [PastaService, ...pastaProviders],
})
export class PastaModule {}
