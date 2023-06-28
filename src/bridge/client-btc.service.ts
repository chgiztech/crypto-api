import { ClientProxy } from './client-proxy';
import { BalanceInterface } from './interfaces/balance.interface';

export class ClientBtcService extends ClientProxy {
  public async getBalance(address: string): Promise<BalanceInterface> {
    return {
      amount: BigInt(0),
      decimals: 0,
    };
  }
}
