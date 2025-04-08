import { UserEntity } from '@entity';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Request } from 'express';
import ms from 'ms';
import * as speakeasy from 'speakeasy';
import { AppConfig } from '../../../config/global.config';
import { UsersService } from '../users/users.service';
import {
  ForgotUserPasswordRequestDto,
  GenerateRefreshTokenDto,
  UpdateUserPasswordRequestDto,
} from './auth.dto';
import { JwtPayloadInterface } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    private appConf: AppConfig,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    req: Request,
    username: string,
    pass: string,
  ): Promise<UserEntity> {
    const user = await this.usersService.findByUsername(username);

    if (!user?.passport?.password) {
      throw new NotFoundException('NOT_FOUND');
    }

    const isMatch = await compare(pass, user.passport.password);

    if (!isMatch) {
      await this.usersService.updateLastFailedLoginTime(user.id);
      throw new UnauthorizedException('WRONG_PASS');
    }

    if (user.passport.secretToken) {
      if (!req.body.verificationCode) {
        throw new UnauthorizedException('WRONG_2FA');
      }

      const verified = speakeasy.totp.verify({
        secret: user.passport.secretToken,
        encoding: 'base32',
        token: req.body.verificationCode,
      });
      if (!verified) {
        throw new UnauthorizedException('WRONG_2FA');
      }
    }

    const { passport, ...result } = user;

    return result;
  }

  async getJwt(user: UserEntity) {
    const payload: JwtPayloadInterface = {
      username: user.username,
      id: user.id,
      firstname: user.firstName,
      lastname: user.lastName,
    };

    const accessToken: string = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
    const refreshToken: string = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: this.appConf.JWT_REFRESH_SECRET,
      algorithm: 'HS256',
    });

    return {
      accessToken,
      refreshToken,
      expireTime: ms('15m'),
    };
  }

  async login(req: Request, user: UserEntity) {
    const jwt = await this.getJwt(user);
    return jwt;
  }

  async generateRefreshToken(dto: GenerateRefreshTokenDto) {
    const { refreshToken } = dto;
    const verified = this.jwtService.verify(refreshToken, {
      secret: this.appConf.JWT_REFRESH_SECRET,
      algorithms: ['HS256'],
    });
    if (!verified) {
      throw new UnauthorizedException('NOT_AUTHED');
    }
    const payload: JwtPayloadInterface = this.jwtService.decode(
      refreshToken,
    ) as JwtPayloadInterface;

    const user = await this.usersService.findById(payload.id);

    if (!user) {
      throw new ForbiddenException('USER_BLOCKED');
    }

    const jwt = await this.getJwt(user);
    return jwt;
  }

  async verifyRefreshToken(dto: GenerateRefreshTokenDto) {
    const { refreshToken } = dto;
    const verified = this.jwtService.verify(refreshToken, {
      secret: this.appConf.JWT_REFRESH_SECRET,
      algorithms: ['HS256'],
    });
    if (!verified) {
      throw new UnauthorizedException('NOT_AUTHED');
    }
    const payload: JwtPayloadInterface = this.jwtService.decode(
      refreshToken,
    ) as JwtPayloadInterface;

    return {
      isValid: true,
    };
  }

  async forgotUserPassword(req: Request, dto: ForgotUserPasswordRequestDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user?.passport?.secretToken) {
      throw new NotFoundException('NOT_FOUND');
    }
  }

  async updateUserPassword(
    req: Request,
    dto: UpdateUserPasswordRequestDto,
  ): Promise<void> {
    const user = req.user as UserEntity;

    if (dto.newPassword !== dto.confirmNewPassword) {
      throw new BadRequestException('PASSWORDS_NOT_EQUAL');
    }

    const matchPassword = await compare(
      dto.currentPassword,
      user.passport.password,
    );
    if (!matchPassword) {
      throw new BadRequestException('Текущий пароль введен неверно');
    }

    if (!user?.passport) {
      throw new NotFoundException('NOT_FOUND');
    }

    const isPreviouslyUsedPassword =
      await this.usersService.passwordUsedPreviously(user.id, dto.newPassword);

    if (isPreviouslyUsedPassword) {
      throw new BadRequestException('ALREADY_USED');
    }

    await this.usersService.updateUserPassword(
      user.id,
      user.passport.id,
      dto.newPassword,
    );
  }
}
