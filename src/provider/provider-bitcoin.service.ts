import { ProviderProxyInterface } from './interfaces/provider-proxy.interface';

export class ProviderBitcoinService implements ProviderProxyInterface {
  constructor() {}

  public async getBalance(address: string): Promise<any> {}
}
