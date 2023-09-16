import { HttpModule, Module } from '@nestjs/common';
import { BitcoinConfigModule } from '@/config/bitcoin/bitcoin.config-module';
import { BitcoinConfig } from '@/config/bitcoin/bitcoin.config';
import { BitcoinService } from './bitcoin.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [BitcoinConfigModule],
      inject: [BitcoinConfig],
      useFactory: (config: BitcoinConfig) => {
        return {
          auth: {
            username: config.username,
            password: config.password,
          },
          baseURL: config.host,
          headers: {
            'Content-Type': 'text/plain',
          },
        };
      },
    }),
  ],
  providers: [BitcoinService],
  exports: [BitcoinService],
})
export class BitcoinModule {}
