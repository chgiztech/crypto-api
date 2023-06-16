import { Controller, Post, Body, UseGuards, Res, Put } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './utils/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './auth.response';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    return new AuthResponse(await this.authService.login(loginDto, res));
  }

  @Post('register')
  public async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    return new AuthResponse(await this.authService.register(registerDto, res));
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh-token')
  public async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refreshToken(refreshTokenDto, res);
  }

  @UseGuards(JwtAuthGuard)
  @Put('logout')
  public async logout(@Res() res: Response) {}
}
