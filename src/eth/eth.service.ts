import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { Eth } from 'web3-eth';
import { Utils } from 'web3-utils';

@Injectable()
export class EthService {
  private readonly web3: Web3;
  public readonly eth: Eth;
  public readonly utils: Utils;

  constructor(
    private readonly host: string,
    private readonly username: string,
    private readonly password: string,
  ) {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(host, {
        headers: [
          {
            name: 'Authorization',
            value: `Basic ${username}:${password}`,
          },
        ],
      }),
    );
    this.eth = this.web3.eth;
    this.utils = this.web3.utils;
  }

  public async getBalance(address: string): Promise<string> {
    const amount = await this.eth.getBalance(address);

    return amount;
  }
}
