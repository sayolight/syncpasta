import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly apiKeyService: ApplicationService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: CreateApplicationDto, @Req() req: Request) {
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
