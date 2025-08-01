import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateOAuthClientDto {
  @IsNotEmpty()
  name: string;

  @IsUrl()
  redirectUri: string;
}
