import { IsString } from 'class-validator';
import { Env } from '../utils/env.decorator';

export class EthereumConfig {
  @IsString()
  @Env()
  public readonly ETH_RPC_BASE_URL: string;

  @IsString()
  @Env({ required: true })
  public readonly ETH_RPC_AUTH_USERNAME: string;

  @IsString()
  @Env()
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
