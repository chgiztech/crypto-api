import { IsString } from 'class-validator';
import { config } from 'dotenv';

import { Env } from '../utils/env.decorator';

config();

export class JwtConfig {
  @IsString()
  @Env()
  public readonly JWT_ACCESS_TOKEN_SECRET: string;

  @IsString()
  @Env()
  public readonly JWT_ACCESS_TOKEN_EXPIRES: string;

  @IsString()
  @Env()
  public readonly JWT_REFRESH_TOKEN_SECRET: string;

  @IsString()
  @Env()
  public readonly JWT_REFRESH_TOKEN_EXPIRES: string;

  get accessToken() {
    return {
      secret: this.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: this.JWT_ACCESS_TOKEN_EXPIRES,
    };
  }

  get refreshToken() {
    return {
      secret: this.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: this.JWT_REFRESH_TOKEN_EXPIRES,
    };
  }
}
