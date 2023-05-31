import { IsBoolean, IsInt, IsString, IsOptional } from 'class-validator';
import { Env } from 'env-decorator';

export class TypeOrmConfig {
  @IsString()
  @Env()
  public readonly TYPEORM_HOST: string;

  @IsInt()
  @Env()
  public readonly TYPEORM_PORT: number;

  @IsString()
  @Env()
  public readonly TYPEORM_DATABASE: string;

  @IsString()
  @Env()
  public readonly TYPEORM_USERNAME: string;

  @IsString()
  @Env()
  public readonly TYPEORM_PASSWORD: string;

  get getFullSettings() {
    return {
      database: this.TYPEORM_DATABASE,
      username: this.TYPEORM_USERNAME,
      password: this.TYPEORM_PASSWORD,
      host: this.TYPEORM_HOST,
      port: this.TYPEORM_PORT,
    };
  }
}
