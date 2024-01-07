import { IsString } from 'class-validator';
import { EnvValue } from '../utils/env-value.decorator';

export class JwtConfig {
  @IsString()
  @EnvValue()
  public readonly JWT_ACCESS_TOKEN_SECRET: string;

  @IsString()
  @EnvValue()
  public readonly JWT_ACCESS_TOKEN_EXPIRES: string;

  @IsString()
  @EnvValue()
  public readonly JWT_REFRESH_TOKEN_SECRET: string;

  @IsString()
  @EnvValue()
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
