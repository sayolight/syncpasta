import { DataSource } from 'typeorm';
import { ApiKey } from './entities/api-key.entity';

export const apiKeyProviders = [
  {
    provide: 'API_KEY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ApiKey),
    inject: ['DATA_SOURCE'],
  },
];
