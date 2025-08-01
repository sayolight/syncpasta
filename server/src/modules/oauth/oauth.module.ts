import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../core/database/database.module';
import { OAuthController } from './oauth.controller';
import { oauthProviders } from './oauth.providers';
import { OAuthService } from './oauth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OAuthController],
  providers: [OAuthService, ...oauthProviders],
  exports: [],
})
export class OAuthModule {}
