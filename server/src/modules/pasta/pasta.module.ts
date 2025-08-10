import { Module } from '@nestjs/common';
import { PastaService } from './pasta.service';
import { PastaController } from './pasta.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { pastaProviders } from './pasta.providers';
import { FirebaseModule } from 'src/core/firebase/firebase.module';
import { StorageModule } from '../../core/storage/storage.module';
import { ApiKeyModule } from '../api-key/api-key.module';
import { ApiKeyGuard } from '../api-key/api-key.guard';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [DatabaseModule, FirebaseModule, StorageModule, ApiKeyModule],
  controllers: [PastaController],
  providers: [PastaService, ...pastaProviders, ApiKeyGuard, AuthGuard],
})
export class PastaModule {}
