import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'entities';

import { UsersService } from '@/users/users.service';
import { TokenService } from '@/token/token.service';
import { PayloadInterface } from '@/token/interfaces/payload.interface';
import { TokenInterface } from '@/token/interfaces/tokens.interface';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
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

  public async login(
    loginDto: LoginDto,
    res: Response,
  ): Promise<TokenInterface> {
    const user = await this.validate(loginDto.username, loginDto.password);
    const tokens = await this.tokenService.getjwtTokens(user, res);
    await this.tokenService.saveRefreshToken(user, tokens.refreshToken);
    return tokens;
  }

  public async register(
    registerDto: RegisterDto,
    res: Response,
  ): Promise<TokenInterface> {
    const user = await this.usersService.create(registerDto);
    const tokens = await this.tokenService.getjwtTokens(user, res);
    await this.tokenService.saveRefreshToken(user, tokens.refreshToken);
    return tokens;
  }

  public async refreshToken(
    refreshTokenDto: RefreshTokenDto,
    res: Response,
  ): Promise<TokenInterface> {
    const payload: PayloadInterface = this.tokenService.decode(
      refreshTokenDto.refreshToken,
    ) as PayloadInterface;

    const options = await this.tokenService.findOne(payload.id);

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

    return this.tokenService.getjwtTokens(payload, res);
  }
}
