import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { ApplicationLog } from './entities/application-log.entity';
import { CreateApplicationLogDto } from './dto/create-application-log.dto';
import { Request } from 'express';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject('APPLICATION_REPOSITORY')
    private applicationRepository: Repository<Application>,

    @Inject('APPLICATION_LOG_REPOSITORY')
    private applicationLogRepository: Repository<ApplicationLog>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto, uid: string) {
    const { secret, keyHashed, prefix } = await this.generateKey();
    const application = this.applicationRepository.create({
      key: keyHashed,
      prefix,
      owner: { uid },
      ...createApplicationDto,
    });

    await this.applicationRepository.save(application);
    return {
      id: application.id,
      ...createApplicationDto,
      key: `${prefix}.${secret}`,
    };
  }

  async generateKey() {
    const secret = randomBytes(32).toString('hex');
    const prefix = randomBytes(16).toString('hex');
    const keyHashed = await bcrypt.hash(secret, 10);

    return { secret, keyHashed, prefix };
  }

  async validateApiKey(key: string) {
    const [prefix, keyUnhashed] = key.split('.');

    const application = await this.applicationRepository.findOne({
      where: { prefix },
      relations: ['owner'],
    });
    if (!application) return { isValid: false };

    const isValid = await bcrypt.compare(keyUnhashed, application.key);
    return {
      uid: application.owner.uid,
      applicationId: application.id,
      isValid,
    };
  }

  async revoke(id: number, uid: string) {
    const application = await this.applicationRepository.findOne({
      where: { id, owner: { uid } },
    });
    if (!application) throw new BadRequestException('API key not found.');

    await this.applicationRepository.remove(application);
    return { success: true };
  }

  async reset(id: number, uid: string) {
    const application = await this.applicationRepository.findOne({
      where: { id, owner: { uid } },
    });
    if (!application) throw new BadRequestException('API key not found.');

    const { secret, keyHashed, prefix } = await this.generateKey();
    await this.applicationRepository.update(
      {
        id,
        owner: { uid },
      },
      {
        key: keyHashed,
        prefix,
      },
    );

    return {
      ...application,
      key: `${prefix}.${secret}`,
    };
  }

  async findAll(uid: string) {
    return await this.applicationRepository.find({
      where: {
        owner: { uid },
      },
      select: ['id', 'name', 'description'],
    });
  }

  async createLog(createApplicationLogDto: CreateApplicationLogDto) {
    const applicationLog = this.applicationLogRepository.create({
      application: { id: createApplicationLogDto.applicationId },
      ...createApplicationLogDto,
    });
    await this.applicationLogRepository.save(applicationLog);
    return applicationLog;
  }

  async findLogs(req: Request, applicationId: string) {
    return await this.applicationLogRepository.find({
      where: {
        application: { id: +applicationId, owner: { uid: req.user!.uid } },
      },
    });
  }
}
