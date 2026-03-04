import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { PastaModule } from '../pasta/pasta.module';
import { UsersModule } from '../users/users.module';
import { ApplicationModule } from '../applications/application.module';

@Module({
  imports: [CoreModule, PastaModule, UsersModule, ApplicationModule],
})
export class AppModule {}
