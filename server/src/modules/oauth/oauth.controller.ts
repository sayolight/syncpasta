import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateOAuthClientDto } from './dto/create-oauth-client.dto';
import { OAuthService } from './oauth.service';
import { AuthGuard } from '../../modules/auth/auth.guard';
import { Request } from 'express';

@Controller('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Post()
  async create(@Body() body: CreateOAuthClientDto) {
    return await this.oauthService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get('authorize')
  async authorize(
    @Query('client_id') clientId: string,
    @Query('redirect_uri') redirectUri: string,
    @Query('response_type') responseType: string,
    @Query('state') state: string,
    @Req() req: Request,
  ) {}
}
