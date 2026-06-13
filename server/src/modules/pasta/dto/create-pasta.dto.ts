import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePastaDto {
  @ApiProperty()
  @IsNotEmpty()
  keywords: string;

  @ApiPropertyOptional()
  @IsOptional()
  text?: string;

  @ApiPropertyOptional({
    type: 'file',
    description:
      'image/png; image/jpeg; image/webp; image/gif; video/mp4; video/webm.',
  })
  file?: never;
}
