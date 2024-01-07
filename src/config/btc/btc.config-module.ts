import { Module } from '@nestjs/common';
import { BtcConfig } from './btc.config';

@Module({
  providers: [BtcConfig],
  exports: [BtcConfig],
})
export class BtcConfigModule {}
