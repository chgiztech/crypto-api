import { IsString } from 'class-validator';
import { Env } from '../utils/env.decorator';

export class BitcoinConfig {
  @IsString()
  @Env()
  public readonly BTC_RPC_BASE_URL: string;

  @IsString()
  @Env()
  public readonly BTC_RPC_AUTH_USERNAME: string;

  @IsString()
  @Env()
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
