import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { Accounts } from 'web3-eth-accounts';

@Injectable()
export class EthereumService {
  private readonly web3: Web3;
  private readonly signMessage = 'Authentication';

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
  }

  get accounts(): Accounts {
    return this.web3.eth.accounts;
  }

  public toHex(value: string): string {
    return this.web3.utils.toHex(value);
  }

  public getBalance(address: string): Promise<string> {
    return this.web3.eth.getBalance(address);
  }

  public getAddress(signature: string): string {
    return this.web3.eth.accounts.recover(
      this.toHex(this.signMessage),
      signature,
    );
  }
}
