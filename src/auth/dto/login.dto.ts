import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  public readonly username: string;

  @IsString()
  public readonly password: string;
}
