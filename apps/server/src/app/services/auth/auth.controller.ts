import {
  Request,
  Controller,
  Post,
  UseGuards,
  Body,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {
  AuthRequestDto,
  GenerateRefreshTokenDto,
  RefreshTokenIsValidResponseDto,
  JwtResponseDto,
  AuthResponseDto,
  UpdateUserPasswordRequestDto,
} from './auth.dto';
import { Public } from './is-public.decorator';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Авторизация по логину/паролю',
  })
  @ApiResponse({
    type: () => AuthResponseDto,
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() _dto: AuthRequestDto) {
    const user = req.user;
    return this.authService.login(req, user);
  }

  @ApiOperation({
    description: 'Сервис для получения обновленных accessToken и refreshToken',
  })
  @ApiResponse({
    type: () => JwtResponseDto,
  })
  @Post('refresh-token')
  async generateRefreshToken(@Body() dto: GenerateRefreshTokenDto) {
    const result = await this.authService.generateRefreshToken(dto);
    return result;
  }

  @ApiOperation({
    description: 'Сервис для проверки refreshToken',
  })
  @ApiResponse({
    type: () => RefreshTokenIsValidResponseDto,
  })
  @Post('verify-refresh-token')
  async verifyRefreshToken(@Body() body: GenerateRefreshTokenDto) {
    return await this.authService.verifyRefreshToken(body);
  }

  @ApiOperation({ description: 'Обновление пароля' })
  @Put('update-password')
  async updateUserPassword(
    @Request() req,
    @Body() dto: UpdateUserPasswordRequestDto,
  ) {
    await this.authService.updateUserPassword(req, dto);
    return { message: 'DONE' };
  }
}
