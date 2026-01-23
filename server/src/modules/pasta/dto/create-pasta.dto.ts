import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePastaDto {
  @IsNotEmpty()
  description: string;

  @IsOptional()
  text?: string;
}
