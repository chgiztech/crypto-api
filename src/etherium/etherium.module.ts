import { Module } from '@nestjs/common';
import { EtheriumService } from './etherium.service';
import { EtheriumController } from './etherium.controller';
import { EtheriumConfig } from '@/common/config/etherium/etherium-config';
import { EtheriumConfigModule } from '@/common/config/etherium/etherium-config.module';

@Module({
  imports: [EtheriumConfigModule],
  controllers: [EtheriumController],
  providers: [
    {
      provide: EtheriumService,
      inject: [EtheriumConfig],
      useFactory: (config: EtheriumConfig) => {
        new EtheriumService(config.host, config.username, config.password);
      },
    },
  ],
  exports: [EtheriumService],
})
export class EtheriumModule {}
