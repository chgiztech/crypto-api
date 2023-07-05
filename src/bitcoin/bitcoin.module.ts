import { BitcoinService } from './bitcoin.service';
import { HttpModule, Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [BitcoinService],
  exports: [BitcoinService],
})
export class BitcoinModule {}
