import { TokenInterface } from '@/token/interfaces/tokens.interface';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty()
  public readonly accessToken: string;
  @ApiProperty()
  public readonly refreshToken: string;

  constructor(auth: TokenInterface) {
    this.accessToken = auth.accessToken;
    this.refreshToken = auth.refreshToken;
  }
}
