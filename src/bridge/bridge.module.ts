import { EthModule } from '@/eth/eth.module';
import { Module } from '@nestjs/common';
import { BridgeController } from './bridge.controller';
import { BridgeFactory } from './bridge.factory';
import { ClientEthService } from './client-eth.service';
import { ClientBtcService } from './client-btc.service';

@Module({
  imports: [EthModule],
  controllers: [BridgeController],
  providers: [BridgeFactory, ClientEthService, ClientBtcService],
})
export class BridgeModule {}
