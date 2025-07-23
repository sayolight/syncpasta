import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { PastaModule } from '../pasta/pasta.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [CoreModule, PastaModule, UsersModule],
})
export class AppModule {}
