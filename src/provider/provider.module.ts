import { EthModule } from '@/eth/eth.module';
import { Module } from '@nestjs/common';
import { ProviderBitcoinService } from './provider-bitcoin.service';
import { ProviderEthereumService } from './provider-ethereum.service';
import { ProviderController } from './provider.controller';
import { ProviderFactory } from './provider.factory';
import { BtcModule } from '@/btc/btc.module';

@Module({
  imports: [EthModule, BtcModule],
  controllers: [ProviderController],
  providers: [ProviderFactory, ProviderEthereumService, ProviderBitcoinService],
})
export class ProviderModule {}
