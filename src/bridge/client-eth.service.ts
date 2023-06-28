import { EthService } from '@/eth/eth.service';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from './client-proxy';
import { BalanceInterface } from './interfaces/balance.interface';

@Injectable()
export class ClientEthService extends ClientProxy {
  constructor(private readonly web3: EthService) {
    super();
  }

  public async getBalance(address: string): Promise<BalanceInterface> {
    const amount = await this.web3.eth.getBalance(address);

    return {
      amount: BigInt(amount),
      decimals: 18,
    };
  }
}
