import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PastaService } from './pasta.service';
import { CreatePastaDto } from './dto/create-pasta.dto';
import { AuthGuard } from 'src/core/firebase/auth.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('pasta')
export class PastaController {
  constructor(private readonly pastaService: PastaService) {}

  @Get()
  async findByUser(@Req() req: Request, @Query('query') query: string) {
    return await this.pastaService.findByUser(req.user!.uid, query);
  }

  @Post()
  @UseInterceptors(FileInterceptor('pasta'))
  async create(
    @Req() req: Request,
    @Body() createPastaDto: CreatePastaDto,
    @UploadedFile() pasta: Express.Multer.File,
  ) {
    return await this.pastaService.create(req.user!.uid, createPastaDto, pasta);
  }
}
