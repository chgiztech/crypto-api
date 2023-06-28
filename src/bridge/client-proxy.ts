import { BalanceInterface } from './interfaces/balance.interface';

export abstract class ClientProxy {
  public abstract getBalance(address: string): Promise<BalanceInterface>;
  //   public abstract getTransaction(txid: string): Promise<any>;
}
