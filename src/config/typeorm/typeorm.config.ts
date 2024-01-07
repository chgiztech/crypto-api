import { IsBoolean, IsInt, IsString } from 'class-validator';
import { EnvValue } from '../utils/env-value.decorator';

export class TypeOrmConfig {
  @IsString()
  @EnvValue()
  public readonly TYPEORM_HOST: string;

  @IsInt()
  @EnvValue()
  public readonly TYPEORM_PORT: number;

  @IsString()
  @EnvValue()
  public readonly TYPEORM_DATABASE: string;

  @IsString()
  @EnvValue()
  public readonly TYPEORM_USERNAME: string;

  @IsString()
  @EnvValue()
  public readonly TYPEORM_PASSWORD: string;

  @IsBoolean()
  @EnvValue()
  public readonly TYPEORM_LOGGING: boolean;

  @IsBoolean()
  @EnvValue()
  public readonly TYPEORM_SYNCHRONIZE: boolean;

  public get fullSettings() {
    return {
      host: this.TYPEORM_HOST,
      port: this.TYPEORM_PORT,
      database: this.TYPEORM_DATABASE,
      username: this.TYPEORM_USERNAME,
      password: this.TYPEORM_PASSWORD,
      synchronize: this.TYPEORM_SYNCHRONIZE,
      logging: this.TYPEORM_LOGGING,
    };
  }
}
