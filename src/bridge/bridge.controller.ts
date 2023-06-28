import { Controller, Get, Param } from '@nestjs/common';
import { BridgeFactory } from './bridge.factory';
import { CoinEnum, NetEnum } from '@/common/enums';
import { GetBalanceDto } from './dto/get-balance.dto';
// import { BridgeFactory } from './bridge.factory';
// import { CoinEnum } from './enums/coin.enum';
// import { NetEnum } from './enums/net.enum';

@Controller()
export class BridgeController {
  constructor(
    private readonly bridgeFactory: BridgeFactory, // private readonly eth: ClientEthereumService,
  ) {}

  @Get(':network/:coin/wallet/:address/balance')
  public async getBalance(getBalanceDto: GetBalanceDto) {
    // return (await this.bridgeFactory.for(network)).getBalance(address);

    return await this.bridgeFactory
      .for(getBalanceDto.network, getBalanceDto.coin)
    // return this.agentServiceFactory.for(network, coin).getBalance(address);
  }
}
