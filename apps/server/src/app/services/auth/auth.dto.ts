import { PassportDto, RoleDto, UserDto } from '@dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class AuthRequestDto {
  @ApiProperty({ description: 'username пользователя' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Пароль пользователя' })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Код с двухфакторной аутентификатора',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  verificationCode?: string;
}

export class PassportResponseDto extends PickType(PassportDto, [
  'id',
  'password',
  'secretToken',
  'expiredAt',
  'updatedAt',
] as const) {}

export class RoleResponseDto extends PickType(RoleDto, [
  'id',
  'name',
] as const) {}

export class UserResponseDto extends PickType(UserDto, [
  'id',
  'username',
  'email',
  'firstName',
  'lastName',
  'isDeleted',
  'lastFailedLoginTime',
  'createdAt',
  'updatedAt',
] as const) {}

export class GenerateRefreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class RefreshTokenIsValidResponseDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}

export class ForgotUserPasswordRequestDto extends PickType(UserDto, [
  'email',
] as const) {}

export class JwtResponseDto {
  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;

  @ApiProperty()
  @IsNumber()
  expireTime: number;
}

export class AuthResponseDto extends PickType(JwtResponseDto, [
  'accessToken',
  'refreshToken',
  'expireTime',
] as const) {
  @ApiProperty()
  @IsString()
  uuid: string;
}

export class UpdateUserPasswordRequestDto {
  @ApiProperty({
    description: 'Текущий пароль',
    example: 'abc',
  })
  @IsString()
  @MinLength(8)
  readonly currentPassword: string;

  @ApiProperty({
    description: 'Новый пароль',
    example: 'abcd',
  })
  @IsString()
  @MinLength(8)
  readonly newPassword: string;

  @ApiProperty({
    description: 'Подтверждение нового пароля',
    example: 'abcd',
  })
  @IsString()
  @MinLength(8)
  readonly confirmNewPassword: string;
}
