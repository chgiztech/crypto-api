import { Injectable } from '@nestjs/common';
import { CookieOptions } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtConfig } from 'config';
import { TokenEntity, UserEntity } from 'entities';

import { TokensInterface } from './interfaces/tokens.interface';
import { PayloadInterface } from './interfaces/payload.interface';

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
  ): Promise<TokensInterface> {
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

    return {
      accessToken,
      refreshToken,
      cookieOptions,
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

  public async saveToken(user: UserEntity, refreshToken: string) {
    const hashRefreshToken: string = await this.generateRefreshTokenHash(
      refreshToken,
    );

    await this.tokenRepository.save({
      ...user,
      saveRefreshToken: hashRefreshToken,
    });
  }

  public async generateRefreshTokenHash(token: string): Promise<string> {
    const salt = await bcrypt.genSalt<number>(5);
    return await bcrypt.hash<string>(token, salt);
  }
}
