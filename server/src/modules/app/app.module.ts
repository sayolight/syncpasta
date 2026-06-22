import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { PastaModule } from '../pasta/pasta.module';
import { UsersModule } from '../users/users.module';
import { ApplicationModule } from '../applications/application.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 15000,
          limit: 100,
        },
      ],
    }),
    CoreModule,
    PastaModule,
    UsersModule,
    ApplicationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
