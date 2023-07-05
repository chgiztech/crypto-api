import { BalanceInterface } from './balance.interface';

export interface ProviderProxyInterface {
  getBalance(address: string): Promise<BalanceInterface>;
}
