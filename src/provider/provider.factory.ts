import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProviderEthereumService } from './provider-ethereum.service';
import { ProviderBitcoinService } from './provider-bitcoin.service';
import { CoinEnum } from '@/common/enums';
import { ProviderProxyInterface } from './interfaces/provider-proxy.interface';

@Injectable()
export class ProviderFactory {
  constructor(
    private readonly providerEthereumService: ProviderEthereumService,
    private readonly providerBitcoinService: ProviderBitcoinService,
  ) {}

  public getProvider(coin: string): ProviderProxyInterface {
    switch (coin) {
      case CoinEnum.ETH:
        return this.providerEthereumService;
      case CoinEnum.BTC:
        return this.providerBitcoinService;
      default:
        throw new InternalServerErrorException();
    }
  }
}
