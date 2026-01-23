import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { Repository } from 'typeorm';
import { ApiKey } from './entities/api-key.entity';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ApiKeyService {
  constructor(
    @Inject('API_KEY_REPOSITORY') private apikeyRepository: Repository<ApiKey>,
  ) {}

  async create(createApiKeyDto: CreateApiKeyDto, uid: string) {
    const key = randomBytes(32).toString('hex');
    const prefix = randomBytes(16).toString('hex');
    const keyHashed = await bcrypt.hash(key, 10);
    const apiKey = this.apikeyRepository.create({
      key: keyHashed,
      prefix,
      owner: { uid },
      ...createApiKeyDto,
    });

    await this.apikeyRepository.save(apiKey);
    return {
      key: `${prefix}.${key}`,
    };
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
    if (!apiKey) {
      throw new BadRequestException('API key not found.');
    }
    await this.apikeyRepository.remove(apiKey);
    return { success: true };
  }
}
