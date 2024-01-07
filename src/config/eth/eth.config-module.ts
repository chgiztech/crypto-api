import { Module } from '@nestjs/common';
import { EthConfig } from './eth.config';

@Module({
  providers: [EthConfig],
  exports: [EthConfig],
})
export class EthConfigModule {}
