import { EthereumModule } from '@/ethereum/ethereum.module';
import { Module } from '@nestjs/common';
import { BridgeController } from './bridge.controller';
import { ClientEthereumService } from './services/client-ethereum.service';

@Module({
  imports: [EthereumModule],
  controllers: [BridgeController],
  providers: [ClientEthereumService],
})
export class BridgeModule {}
