import { EthConfig } from '@/config/eth/eth-config';
import { EthConfigModule } from '@/config/eth/eth-config.module';
import { Module } from '@nestjs/common';
import { EthService } from './eth.service';

@Module({
  imports: [EthConfigModule],
  providers: [
    {
      provide: EthService,
      inject: [EthConfig],
      useFactory: (config: EthConfig): EthService => {
        return new EthService(config.host, config.username, config.password);
      },
    },
  ],
  exports: [EthService],
})
export class EthModule {}
