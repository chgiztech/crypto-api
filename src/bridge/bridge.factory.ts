import { CoinEnum, NetEnum } from '@/common/enums';
import { Injectable } from '@nestjs/common';
import { ClientEthService } from './client-eth.service';
import { ClientBtcService } from './client-btc.service';
import { ClientProxy } from './client-proxy';

@Injectable()
export class BridgeFactory {
  constructor(
    private readonly clientBtcService: ClientBtcService,
    private readonly clientEthService: ClientEthService,
  ) {}

  public async for(network: NetEnum, coin: CoinEnum): Promise<ClientProxy> {
    switch (network) {
      case NetEnum.BTC:
        return this.clientBtcService;
      case NetEnum.ETH:
        return this.clientEthService;
      default:
        throw new Error('Invalid network');
    }
  }
}
