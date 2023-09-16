import { Module } from '@nestjs/common';
import { BitcoinConfig } from './bitcoin.config';

@Module({
    providers: [BitcoinConfig],
    exports: [BitcoinConfig],
})
export class BitcoinConfigModule {}
