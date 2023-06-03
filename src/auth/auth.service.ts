import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'entities';

import { UsersService } from '@/users/users.service';
import { TokenService } from '@/token/token.service';
import { PayloadInterface } from '@/token/interfaces/payload.interface';
import { TokensInterface } from '@/token/interfaces/tokens.interface';

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

  public async login(loginDto: LoginDto): Promise<TokensInterface> {
    const user = await this.validate(loginDto.username, loginDto.password);
    const tokens = await this.tokenService.getjwtTokens(user);
    await this.tokenService.saveToken(user, tokens.refreshToken);
    return tokens;
  }

  public async register(registerDto: RegisterDto): Promise<TokensInterface> {
    const user = await this.usersService.create(registerDto);
    const tokens = await this.tokenService.getjwtTokens(user);
    await this.tokenService.saveToken(user, tokens.refreshToken);
    return tokens;
  }

  public async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<TokensInterface> {
    const payload: PayloadInterface = this.tokenService.decode(
      refreshTokenDto.refreshToken,
    ) as PayloadInterface;

    const options = await this.tokenService.findOne(payload.id);

    if (!options?.saveRefreshToken) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(
      refreshTokenDto.refreshToken,
      options.saveRefreshToken,
    );

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return this.tokenService.getjwtTokens(payload);
  }
}
