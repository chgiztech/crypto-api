import { Module } from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { EthereumConfigModule } from '@/config/ethereum/ethereum.config-module';
import { EthereumConfig } from '@/config/ethereum/ethereum.config';

@Module({
  imports: [EthereumConfigModule],
  providers: [
    {
      provide: EthereumService,
      inject: [EthereumConfig],
      useFactory: (config: EthereumConfig): EthereumService => {
        return new EthereumService(
          config.host,
          config.username,
          config.password,
        );
      },
    },
  ],
  exports: [EthereumService],
})
export class EthereumModule {}
