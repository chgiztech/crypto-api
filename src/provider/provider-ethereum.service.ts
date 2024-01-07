import { EthService } from '@/eth/eth.service';
import { Injectable } from '@nestjs/common';
import { ProviderProxyInterface } from './interfaces/provider-proxy.interface';
import { GetBalanceResponse } from './provider.response';

@Injectable()
export class ProviderEthereumService implements ProviderProxyInterface {
  constructor(private readonly ethService: EthService) {}

  public async getBalance(address: string): Promise<GetBalanceResponse> {
    const amount = await this.ethService.getBalance(address);

    return {
      amount: BigInt(amount),
    };
  }

  public getAddress(signature: string): string {
    return this.ethService.getAddress(signature);
  }
}
