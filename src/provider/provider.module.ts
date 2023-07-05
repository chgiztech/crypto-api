import { BitcoinModule } from '@/bitcoin/bitcoin.module';
import { Module } from '@nestjs/common';
import { ProviderController } from './provider.controller';
import { ProviderFactory } from './provider.factory';
import { EthereumModule } from '@/ethereum/ethereum.module';
import { ProviderEthereumService } from './provider-ethereum.service';
import { ProviderBitcoinService } from './provider-bitcoin.service';

@Module({
  imports: [EthereumModule, BitcoinModule],
  controllers: [ProviderController],
  providers: [ProviderFactory, ProviderEthereumService, ProviderBitcoinService],
})
export class ProviderModule {}
