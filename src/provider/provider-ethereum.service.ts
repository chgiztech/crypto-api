import { EthereumService } from '@/ethereum/ethereum.service';
import { ProviderProxyInterface } from './interfaces/provider-proxy.interface';
import { GetBalanceResponse } from './provider.response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProviderEthereumService implements ProviderProxyInterface {
  constructor(private readonly ethereumService: EthereumService) {}

  public async getBalance(address: string): Promise<GetBalanceResponse> {
    const amount = await this.ethereumService.getBalance(address);

    return {
      amount: BigInt(amount),
    };
  }
}
