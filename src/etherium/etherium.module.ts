import { Module } from '@nestjs/common';
import { EtheriumService } from './etherium.service';
import { EtheriumController } from './etherium.controller';

@Module({
  imports: [],
  controllers: [EtheriumController],
  providers: [EtheriumService],
})
export class EtheriumModule {}
