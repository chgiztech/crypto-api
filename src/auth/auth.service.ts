import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CookieOptions, Response } from 'express';
import { JwtTokenTypeEnum } from 'enums';
import { JwtInterface, PayloadInterface } from 'interfaces';
import { TokenEntity, UserEntity } from 'entities';
import { UsersService } from '@/users/users.service';
import { JwtConfig } from '@/config/jwt/jwt.config';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { generateHash } from './utils/generate-hash.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly jwtConfig: JwtConfig,
  ) {}

  public async validate(
    username: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.usersService.findOne({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.passport.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }

  public async login(loginDto: LoginDto, res: Response): Promise<JwtInterface> {
    const user = await this.validate(loginDto.username, loginDto.password);
    const tokens = await this.getjwtTokens(user, res);
    await this.saveRefreshToken(user, tokens.refreshToken);
    return tokens;
  }

  public async register(
    registerDto: RegisterDto,
    res: Response,
  ): Promise<JwtInterface> {
    const user = await this.usersService.create(registerDto);
    const tokens = await this.getjwtTokens(user, res);
    await this.saveRefreshToken(user, tokens.refreshToken);
    return tokens;
  }

  public async refreshToken(
    refreshTokenDto: RefreshTokenDto,
    res: Response,
  ): Promise<JwtInterface> {
    const payload: PayloadInterface = this.jwtService.decode(
      refreshTokenDto.refreshToken,
    ) as PayloadInterface;

    const options = await this.findOne(payload.id);

    if (!options?.saveRefreshToken) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare<boolean>(
      refreshTokenDto.refreshToken,
      options.saveRefreshToken,
    );

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return this.getjwtTokens(payload, res);
  }

  public async getjwtTokens(
    user: UserEntity | PayloadInterface,
    res: Response,
  ): Promise<JwtInterface> {
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

    res.cookie(JwtTokenTypeEnum.AccessToken, accessToken, cookieOptions);
    res.cookie(JwtTokenTypeEnum.RefreshToken, refreshToken, cookieOptions);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async findOne(id: number): Promise<TokenEntity> {
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
    const hash: string = await generateHash(refreshToken);

    const token = await this.tokenRepository.findOne({
      where: {
        user: user.id,
      },
    });

    if (token) {
      await this.tokenRepository.update(token.id, {
        saveRefreshToken: hash,
      });
    } else {
      await this.tokenRepository.save({
        user,
        saveRefreshToken: hash,
      });
    }
  }
}
