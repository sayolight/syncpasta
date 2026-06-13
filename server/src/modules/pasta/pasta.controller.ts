import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';

@ApiSecurity('ApiKey')
@UseGuards(AnyAuthGuard)
@Controller('pasta')
export class PastaController {
  constructor(private readonly pastaService: PastaService) {}

  @ApiOperation({ summary: "Get user's pasta list" })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiQuery({
    name: 'query',
    required: false,
    type: String,
  })
  @Get()
  async findByUser(@Req() req: Request, @Query('query') query?: string) {
    return await this.pastaService.findByUser(req, query);
  }

  @ApiOperation({ summary: 'Create a new pasta' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePastaDto })
  @ApiResponse({ status: 201, description: 'Pasta created' })
  @ApiResponse({ status: 400, description: 'No text or file provided' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Req() req: Request,
    @Body() createPastaDto: CreatePastaDto,
    @UploadedFile(new FileValidationPipe()) file?: Express.Multer.File,
  ) {
    return await this.pastaService.create(req, createPastaDto, file);
  }

  @ApiOperation({ summary: 'Update an existing pasta' })
  @ApiBody({ type: UpdatePastaDto })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Pasta does not exist' })
  @Patch(':id')
  async edit(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updatePastaDto: UpdatePastaDto,
  ) {
    return await this.pastaService.update(+id, req, updatePastaDto);
  }

  @ApiOperation({ summary: 'Remove an existing pasta' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    return await this.pastaService.remove(+id, req);
  }
}
