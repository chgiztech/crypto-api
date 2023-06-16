import { Body, Controller, Get, Post } from '@nestjs/common';
import { EtheriumService } from './etherium.service';

@Controller('etherium-net')
export class EtheriumController {
  constructor(private readonly etheriumService: EtheriumService) {}

  @Get('balance/:address')
  public async getBalance() {
    // return await this.etheriumService.createProvider();
  }

  //   @Post('balance')
  //   public async setNumber(@Body('num') num: number) {
  //     return await this.ethersService.setNumber(num);
  //   }
}
