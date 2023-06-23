import { BalanceInterface } from '../interfaces/balance.interface';
import { ClientProxy } from '../utils/coin-proxy';

export class ClientBitCoinService extends ClientProxy {
  public async getBalance(address: string): Promise<BalanceInterface> {
    return {
      amount: BigInt(0),
      decimals: 0,
    };
  }
}
