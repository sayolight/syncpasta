import { Module } from '@nestjs/common';
import { PastaService } from './pasta.service';
import { PastaController } from './pasta.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { pastaProviders } from './pasta.providers';
import { FirebaseModule } from 'src/core/firebase/firebase.module';
import { StorageModule } from '../../core/storage/storage.module';
import { ApplicationModule } from '../applications/application.module';
import { ApiKeyGuard } from '../applications/api-key.guard';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [DatabaseModule, FirebaseModule, StorageModule, ApplicationModule],
  controllers: [PastaController],
  providers: [PastaService, ...pastaProviders, ApiKeyGuard, AuthGuard],
})
export class PastaModule {}
