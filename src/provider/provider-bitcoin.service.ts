import { BitcoinService } from '@/bitcoin/bitcoin.service';
import { ProviderProxyInterface } from './interfaces/provider-proxy.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProviderBitcoinService implements ProviderProxyInterface {
  constructor(private readonly bitcoinService: BitcoinService) {}

  public async getBalance(address: string): Promise<any> {
    const unspents = await this.bitcoinService.listUnspent(address, 0);

    const balance = unspents.reduce(
      (total, unspent) => total + unspent.amount,
      BigInt(0),
    );

    return {
      amount: balance,
    };
  }
}
