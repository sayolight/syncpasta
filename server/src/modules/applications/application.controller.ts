import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async create(@Body() body: CreateApplicationDto, @Req() req: Request) {
    return await this.applicationService.create(body, req.user!.uid);
  }

  @Post('revoke')
  async revoke(@Body('id') id: number, @Req() req: Request) {
    return await this.applicationService.revoke(id, req.user!.uid);
  }

  @Post('reset')
  async reset(@Body('id') id: number, @Req() req: Request) {
    return await this.applicationService.reset(id, req.user!.uid);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return await this.applicationService.findAll(req.user!.uid);
  }

  @Get(':id/logs/')
  async findLogs(@Req() req: Request, @Param('id') id: string) {
    return await this.applicationService.findLogs(req, id);
  }
}
