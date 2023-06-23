import { Module } from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { EthereumConfig } from '@/common/config/ethereum/ethereum-config';
import { EthereumConfigModule } from '@/common/config/ethereum/ethereum-config.module';

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
