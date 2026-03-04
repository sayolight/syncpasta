import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePastaDto {
  @IsNotEmpty()
  keywords: string;

  @IsOptional()
  text?: string;
}
