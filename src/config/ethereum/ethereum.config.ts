import { IsString } from 'class-validator';
import { EnvValue } from '../utils/env-value.decorator';

export class EthereumConfig {
  @IsString()
  @EnvValue()
  public readonly ETH_RPC_BASE_URL: string;

  @IsString()
  @EnvValue()
  public readonly ETH_RPC_AUTH_USERNAME: string;

  @IsString()
  @EnvValue()
  public readonly ETH_RPC_AUTH_PASSWORD: string;

  public get host() {
    return this.ETH_RPC_BASE_URL;
  }

  public get username() {
    return this.ETH_RPC_AUTH_USERNAME;
  }

  public get password() {
    return this.ETH_RPC_AUTH_PASSWORD;
  }
}
