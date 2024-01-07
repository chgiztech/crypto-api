import { BtcService } from '@/btc/btc.service';
import { Injectable } from '@nestjs/common';
import { ProviderProxyInterface } from './interfaces/provider-proxy.interface';

@Injectable()
export class ProviderBitcoinService implements ProviderProxyInterface {
  constructor(private readonly btcService: BtcService) {}

  public async getBalance(address: string): Promise<any> {
    const unspents = await this.btcService.listUnspent(address, 0);

    const balance = unspents.reduce(
      (total, unspent) => total + unspent.amount,
      BigInt(0),
    );

    return {
      amount: balance,
    };
  }
}
