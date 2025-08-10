import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { PastaModule } from '../pasta/pasta.module';
import { UsersModule } from '../users/users.module';
import { ApiKeyModule } from '../api-key/api-key.module';

@Module({
  imports: [CoreModule, PastaModule, UsersModule, ApiKeyModule],
})
export class AppModule {}
