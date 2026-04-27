import { ApplicationLogType } from '../entities/application-log.entity';

export class CreateApplicationLogDto {
  applicationId: number;
  type: ApplicationLogType;
  meta: Record<string, any>;
}
