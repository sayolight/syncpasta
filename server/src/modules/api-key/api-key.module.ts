import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { apiKeyProviders } from './api-key.providers';
import { DatabaseModule } from '../../core/database/database.module';
import { FirebaseModule } from '../../core/firebase/firebase.module';

@Module({
  imports: [DatabaseModule, FirebaseModule],
  controllers: [ApiKeyController],
  providers: [ApiKeyService, ...apiKeyProviders],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
