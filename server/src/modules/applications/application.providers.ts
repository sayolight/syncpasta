import { DataSource } from 'typeorm';
import { Application } from './entities/application.entity';
import { ApplicationLog } from './entities/application-log.entity';

export const applicationProviders = [
  {
    provide: 'APPLICATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Application),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'APPLICATION_LOG_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ApplicationLog),
    inject: ['DATA_SOURCE'],
  },
];
