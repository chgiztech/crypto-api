import { EthConfig } from '@/config/eth/eth-config';
import { EthConfigModule } from '@/config/eth/eth-config.module';
import { Module } from '@nestjs/common';
import { EthereumService } from './ethereum.service';

@Module({
  imports: [EthConfigModule],
  providers: [
    {
      provide: EthereumService,
      inject: [EthConfig],
      useFactory: (config: EthConfig): EthereumService => {
        return new EthereumService(config.host, config.username, config.password);
      },
    },
  ],
  exports: [EthereumService],
})
export class EthereumModule {}
