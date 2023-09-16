import { Module } from '@nestjs/common';
import { EthereumConfig } from './ethereum.config';

@Module({
  providers: [EthereumConfig],
  exports: [EthereumConfig],
})
export class EthereumConfigModule {}
