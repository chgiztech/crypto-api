import { Module } from '@nestjs/common';
import { EtheriumConfig } from './etherium-config';

@Module({
  providers: [EtheriumConfig],
  exports: [EtheriumConfig],
})
export class EtheriumConfigModule {}
