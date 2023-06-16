import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

enum Web3Enum {
  ETH = 'eth',
  UTILS = 'utils',
}

@Injectable()
export class EtheriumService {
  private readonly web3: Web3;
  private readonly eth: Web3[Web3Enum.ETH];
  private readonly utils: Web3[Web3Enum.UTILS];

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

  //   public async getBalance() {
  //     return await contract.methods.getNumber().call();
  //   }

  //   public async setNumber(num: number) {
  //     const accounts = await web3.eth.getAccounts();

  //     const result = await contract.methods
  //       .setNumber(num)
  //       .send({ from: accounts[0] });

  //     return 'success';
  //   }
}
