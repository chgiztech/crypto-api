import { Injectable } from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtConfig } from 'config';
import { TokenEntity, UserEntity } from 'entities';

import { TokenInterface } from './interfaces/tokens.interface';
import { PayloadInterface } from './interfaces/payload.interface';

enum TokenType {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtConfig: JwtConfig,
    private readonly jwtService: JwtService,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  public async getjwtTokens(
    user: UserEntity | PayloadInterface,
    res: Response,
  ): Promise<TokenInterface> {
    const payload: PayloadInterface = {
      username: user.username,
      id: user.id,
    } as PayloadInterface;

    const accessToken: string = this.jwtService.sign(payload);
    const refreshToken: string = this.jwtService.sign(payload, {
      secret: this.jwtConfig.refreshToken.secret,
      expiresIn: this.jwtConfig.refreshToken.expiresIn,
    });

    const cookieOptions: CookieOptions = {
      expires: new Date(Number(this.jwtConfig.accessToken.expiresIn) * 1000),
      httpOnly: true,
    };

    res.cookie(TokenType.AccessToken, accessToken, cookieOptions);
    res.cookie(TokenType.RefreshToken, refreshToken, cookieOptions);

    return {
      accessToken,
      refreshToken,
    };
  }

  public decode(token: string): PayloadInterface {
    return this.jwtService.decode(token) as PayloadInterface;
  }

  public async findOne(id: number): Promise<TokenEntity> {
    return await this.tokenRepository
      .createQueryBuilder('token')
      .where('token.user = :id', { id })
      .select('token.saveRefreshToken', 'saveRefreshToken')
      .getRawOne();
  }

  public async saveRefreshToken(
    user: UserEntity,
    refreshToken: string,
  ): Promise<void> {
    const hashRefreshToken: string = await this.generateRefreshTokenHash(
      refreshToken,
    );

    await this.tokenRepository.save({
      user,
      saveRefreshToken: hashRefreshToken,
    });
  }

  public async generateRefreshTokenHash(token: string): Promise<string> {
    const salt = await bcrypt.genSalt<number>(5);
    return await bcrypt.hash<string>(token, salt);
  }
}
