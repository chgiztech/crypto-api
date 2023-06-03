import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  public readonly refreshToken: string;
}
