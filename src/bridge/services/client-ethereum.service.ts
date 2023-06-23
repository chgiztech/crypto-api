import { Injectable } from '@nestjs/common';
import { EthereumService } from '@/ethereum/ethereum.service';
import { BalanceInterface } from '../interfaces/balance.interface';
import { TokenService } from '@/token/token.service';

@Injectable()
export class ClientEthereumService {
  constructor(private readonly web3: EthereumService) {}

  public async getBalance(address: string): Promise<BalanceInterface> {
    const amount = await this.web3.eth.getBalance(address);

    return {
      amount: BigInt(amount),
      decimals: 18,
    };
  }
}
