import { Controller, Get, Param } from '@nestjs/common';
// import { BridgeFactory } from './bridge.factory';
import { CoinEnum } from './enums/coin.enum';
import { NetEnum } from './enums/net.enum';
import { ClientEthereumService } from './services/client-ethereum.service';

@Controller('bridge')
export class BridgeController {
  constructor(
    // private readonly bridgeFactory: BridgeFactory,
    private readonly eth: ClientEthereumService,
  ) {}

  @Get(':network/:coin/wallet/:address/balance')
  public async getBalance(
    @Param('network') network: NetEnum,
    @Param('coin') coin: CoinEnum,
    @Param('address') address: string,
  ) {
    // return (await this.bridgeFactory.for(network)).getBalance(address);

    return await this.eth.getBalance(address);
    // return this.agentServiceFactory.for(network, coin).getBalance(address);
  }
}
