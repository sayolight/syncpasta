import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PastaService } from './pasta.service';
import { CreatePastaDto } from './dto/create-pasta.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnyAuthGuard } from '../auth/any-auth.guard';
import { FileValidationPipe } from '../../core/storage/file-validation.pipe';
import { UpdatePastaDto } from './dto/update-pasta.dto';
import { ApiQuery, ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('ApiKey')
@UseGuards(AnyAuthGuard)
@Controller('pasta')
export class PastaController {
  constructor(private readonly pastaService: PastaService) {}

  @ApiQuery({
    name: 'query',
    required: false,
    type: String,
  })
  @Get()
  async findByUser(@Req() req: Request, @Query('query') query?: string) {
    return await this.pastaService.findByUser(req, query);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Req() req: Request,
    @Body() createPastaDto: CreatePastaDto,
    @UploadedFile(new FileValidationPipe()) file?: Express.Multer.File,
  ) {
    return await this.pastaService.create(req, createPastaDto, file);
  }

  @Patch(':id')
  async edit(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updatePastaDto: UpdatePastaDto,
  ) {
    return await this.pastaService.update(+id, req, updatePastaDto);
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    return await this.pastaService.remove(+id, req);
  }
}
