import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject('API_KEY_REPOSITORY')
    private apikeyRepository: Repository<Application>,
  ) {}

  async create(createApiKeyDto: CreateApplicationDto, uid: string) {
    const { secret, keyHashed, prefix } = await this.generateKey();
    const apiKey = this.apikeyRepository.create({
      key: keyHashed,
      prefix,
      owner: { uid },
      ...createApiKeyDto,
    });

    await this.apikeyRepository.save(apiKey);
    return {
      id: apiKey.id,
      ...createApiKeyDto,
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

    const apiKey = await this.apikeyRepository.findOne({
      where: { prefix },
      relations: ['owner'],
    });
    if (!apiKey) return { isValid: false };

    const isValid = await bcrypt.compare(keyUnhashed, apiKey.key);
    return { uid: apiKey.owner.uid, isValid };
  }

  async revoke(id: number, uid: string) {
    const apiKey = await this.apikeyRepository.findOne({
      where: { id, owner: { uid } },
    });
    if (!apiKey) throw new BadRequestException('API key not found.');

    await this.apikeyRepository.remove(apiKey);
    return { success: true };
  }

  async reset(id: number, uid: string) {
    const apiKey = await this.apikeyRepository.findOne({
      where: { id, owner: { uid } },
    });
    if (!apiKey) throw new BadRequestException('API key not found.');

    const { secret, keyHashed, prefix } = await this.generateKey();
    await this.apikeyRepository.update(
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
      ...apiKey,
      key: `${prefix}.${secret}`,
    };
  }

  async findAll(uid: string) {
    return await this.apikeyRepository.find({
      where: {
        owner: { uid },
      },
      select: ['id', 'name', 'description'],
    });
  }
}
