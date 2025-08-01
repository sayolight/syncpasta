import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OAuthClient } from './entities/oauth-client.entity';
import { CreateOAuthClientDto } from './dto/create-oauth-client.dto';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OAuthService {
  constructor(
    @Inject('THIRD_PARTY_APP_REPOSITORY')
    private thirdPartyAppRepository: Repository<OAuthClient>,
  ) {}

  async create(createThirdPartyAppDto: CreateOAuthClientDto) {
    const clientId = randomBytes(16).toString('hex');
    const clientSecret = randomBytes(32).toString('hex');
    const clientSecretHashed = await bcrypt.hash(clientSecret, 10);

    const thirdPartyApp = this.thirdPartyAppRepository.create({
      clientId,
      clientSecret: clientSecretHashed,
      ...createThirdPartyAppDto,
    });
    await this.thirdPartyAppRepository.save(thirdPartyApp);

    thirdPartyApp.clientSecret = clientSecret;
    return thirdPartyApp;
  }

  

  async authorizeValidate() {}

  async authorize() {}
}
