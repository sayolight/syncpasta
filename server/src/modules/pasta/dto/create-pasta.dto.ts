import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePastaDto {
  @ApiProperty()
  @IsNotEmpty()
  keywords: string;

  @ApiProperty()
  @IsOptional()
  text?: string;
}
