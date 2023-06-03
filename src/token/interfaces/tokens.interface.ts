import { CookieOptions } from 'express';

export interface TokensInterface {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly cookieOptions: CookieOptions;
}
