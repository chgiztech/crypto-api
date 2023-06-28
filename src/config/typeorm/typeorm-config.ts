import { IsBoolean, IsInt, IsString } from 'class-validator';
import { Env } from '../utils/env.decorator';

export class TypeOrmConfig {
  @IsString()
  @Env({ required: true })
  public readonly TYPEORM_HOST: string;

  @IsInt()
  @Env({ required: true })
  public readonly TYPEORM_PORT: number;

  @IsString()
  @Env({ required: true })
  public readonly TYPEORM_DATABASE: string;

  @IsString()
  @Env({ required: true })
  public readonly TYPEORM_USERNAME: string;

  @IsString()
  @Env({ required: true })
  public readonly TYPEORM_PASSWORD: string;

  @IsBoolean()
  @Env()
  public readonly TYPEORM_LOGGING: boolean;

  @IsBoolean()
  @Env()
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
