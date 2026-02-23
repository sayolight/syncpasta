import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: CreateApiKeyDto, @Req() req: Request) {
    return await this.apiKeyService.create(body, req.user!.uid);
  }

  @UseGuards(AuthGuard)
  @Post('revoke')
  async revoke(@Body('id') id: number, @Req() req: Request) {
    return await this.apiKeyService.revoke(id, req.user!.uid);
  }

  @UseGuards(AuthGuard)
  @Post('reset')
  async reset(@Body('id') id: number, @Req() req: Request) {
    return await this.apiKeyService.reset(id, req.user!.uid);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req: Request) {
    return await this.apiKeyService.findAll(req.user!.uid);
  }
}
