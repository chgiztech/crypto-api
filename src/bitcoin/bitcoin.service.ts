import { HttpService, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

enum BitcoinMethods {
  LIST_UNSPENT = 'listunspent',
}

@Injectable()
export class BitcoinService {
  constructor(private readonly httpService: HttpService) {}

  public async listUnspent(
    address: string,
    minconf = 6,
    maxconf = 9999999,
  ): Promise<any> {
    const list = await this.call<any>(
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

  private async call<R>(
    method: string,
    url = '',
    ...params: unknown[]
  ): Promise<R> {
    try {
      const response = await lastValueFrom(
        this.httpService.post<{ result: R }>(url, {
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
