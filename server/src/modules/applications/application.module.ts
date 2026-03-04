import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { applicationProviders } from './application.providers';
import { DatabaseModule } from '../../core/database/database.module';
import { FirebaseModule } from '../../core/firebase/firebase.module';

@Module({
  imports: [DatabaseModule, FirebaseModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, ...applicationProviders],
  exports: [ApplicationService],
})
export class ApplicationModule {}
