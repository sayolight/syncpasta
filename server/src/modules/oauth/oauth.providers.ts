import { DataSource } from 'typeorm';
import { OAuthClient } from './entities/oauth-client.entity';

export const oauthProviders = [
  {
    provide: 'THIRD_PARTY_APP_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(OAuthClient),
    inject: ['DATA_SOURCE'],
  },
];
