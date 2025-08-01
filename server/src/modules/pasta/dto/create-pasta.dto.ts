import { IsNotEmpty } from 'class-validator';

export class CreatePastaDto {
  @IsNotEmpty()
  description: string;
}
