import { BtcConfig } from '@/config/btc/btc.config';
import { BtcConfigModule } from '@/config/btc/btc.config-module';
import { HttpModule, Module } from '@nestjs/common';
import { BtcService } from './btc.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [BtcConfigModule],
      inject: [BtcConfig],
      useFactory: (config: BtcConfig) => {
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
  providers: [BtcService],
  exports: [BtcService],
})
export class BtcModule {}
