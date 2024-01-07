import { IsString } from 'class-validator';
import { EnvValue } from '../utils/env-value.decorator';

export class BitcoinConfig {
  @IsString()
  @EnvValue()
  public readonly BTC_RPC_BASE_URL: string;

  @IsString()
  @EnvValue()
  public readonly BTC_RPC_AUTH_USERNAME: string;

  @IsString()
  @EnvValue()
  public readonly BTC_RPC_AUTH_PASSWORD: string;

  public get host() {
    return this.BTC_RPC_BASE_URL;
  }

  public get username() {
    return this.BTC_RPC_AUTH_USERNAME;
  }

  public get password() {
    return this.BTC_RPC_AUTH_PASSWORD;
  }
}
