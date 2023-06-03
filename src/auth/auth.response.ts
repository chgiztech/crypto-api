import { Response as Res } from 'express';
import { TokensInterface } from '@/token/interfaces/tokens.interface';
import { Response } from '@/common/interfaces/response.interface';

enum TokenTypeEnum {
  ACCESS = 'accessToken',
  REFERSS = 'refreshToken',
}

export class LoginResposne extends Response<TokensInterface> {
  public readonly success: boolean;
  public readonly accessToken: string;
  public readonly refreshToken: string;

  constructor(result: TokensInterface, res: Res) {
    super();
    this.accessToken = result.accessToken;
    this.refreshToken = result.refreshToken;

    res
      .cookie(TokenTypeEnum.ACCESS, this.accessToken, result.cookieOptions)
      .cookie(TokenTypeEnum.REFERSS, this.refreshToken, result.cookieOptions);
  }
}

export class RegisterResponse extends Response<TokensInterface> {
  public readonly success: boolean;
  public readonly accessToken: string;
  public readonly refreshToken: string;

  constructor(result: TokensInterface, res: Res) {
    super();
    this.accessToken = result.accessToken;
    this.refreshToken = result.refreshToken;

    res
      .cookie(TokenTypeEnum.ACCESS, this.accessToken, result.cookieOptions)
      .cookie(TokenTypeEnum.REFERSS, this.refreshToken, result.cookieOptions);
  }
}

export class RefreshTokenResponse extends Response<TokensInterface> {
  public readonly success: boolean;
  public readonly accessToken: string;
  public readonly refreshToken: string;

  constructor(result: TokensInterface, res: Res) {
    super();
    this.accessToken = result.accessToken;
    this.refreshToken = result.refreshToken;

    res
      .cookie(TokenTypeEnum.ACCESS, this.accessToken, result.cookieOptions)
      .cookie(TokenTypeEnum.REFERSS, this.refreshToken, result.cookieOptions);
  }
}
