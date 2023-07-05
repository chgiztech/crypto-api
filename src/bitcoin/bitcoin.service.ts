import { HttpService, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BitcoinMethods } from './enums/bitcoin-methods.enum';

@Injectable()
export class BitcoinService {
  constructor(private readonly httpService: HttpService) {}

  public async createWallet(
    name: string,
  ): Promise<{ name: string; warning: string }> {
    return this.rpcCall(BitcoinMethods.CREATE_WALLET, '', name);
  }

  public async listUnspent(
    address: string,
    minconf = 6,
    maxconf = 9999999,
  ): Promise<any> {
    const list = await this.rpcCall<any>(
      BitcoinMethods.LIST_UNSPENT,
      `wallet/main`,
      minconf,
      maxconf,
      [address],
    );

    return list.map(item => ({
      ...item,
      amount: BigInt(Number(item.amount * 10 ** 8).toFixed(0)),
    }));
  }

  private async rpcCall<R>(
    method: string,
    url = '',
    ...params: unknown[]
  ): Promise<R> {
    try {
      const response = await lastValueFrom(
        this.httpService.post<{ result: R }>(url, {
          jsonrpc: '1.0',
          id: 'crypto',
          method,
          params,
        }),
      );

      return response.data.result as R;
    } catch (e) {
      throw e;
    }
  }
}
