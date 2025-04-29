import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { ConfigFragment, EnvValue } from 'libs/utils/src';

const DecodeBase64 = (based?: string): string | undefined =>
  based ? Buffer.from(based, 'base64').toString('utf-8') : undefined;

export class TypeORMConfig extends ConfigFragment {
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

  @IsBoolean()
  @EnvValue<boolean>({ defaultValue: false })
  public readonly TYPEORM_MIGRATION_RUN: boolean;

  @IsString()
  @IsOptional()
  @EnvValue({ transform: DecodeBase64 })
  public readonly TYPEORM_SSL_CERT?: string;

  get fullConfig() {
    return {
      database: this.TYPEORM_DATABASE,
      username: this.TYPEORM_USERNAME,
      password: this.TYPEORM_PASSWORD,
      host: this.TYPEORM_HOST,
      port: this.TYPEORM_PORT,
      migrationsRun: this.TYPEORM_MIGRATION_RUN,
      synchronize: this.TYPEORM_SYNCHRONIZE,
      logging: this.TYPEORM_LOGGING,
      ssl: this.TYPEORM_SSL_CERT ? { ca: this.TYPEORM_SSL_CERT } : undefined,
    };
  }
}
