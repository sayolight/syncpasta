import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { applicationProviders } from './application.providers';
import { DatabaseModule } from '../../core/database/database.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, ...applicationProviders],
  exports: [ApplicationService],
})
export class ApplicationModule {}
