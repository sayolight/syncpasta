import { DataSource } from 'typeorm';
import { Pasta } from './entities/pasta.entity';

export const pastaProviders = [
  {
    provide: 'PASTA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Pasta),
    inject: ['DATA_SOURCE'],
  },
];
