import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { CoinEnum } from '@/common/enums';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProviderFactory } from './provider.factory';
import { GetBalanceResponse } from './provider.response';

@Controller()
@UseGuards(JwtAuthGuard)
export class ProviderController {
  constructor(private readonly providerFactory: ProviderFactory) {}

  @Get(':network/:coin/wallet/:address/balance')
  public async getBalance(
    // @Param('network') network: NetEnum,
    @Param('coin') coin: CoinEnum,
    @Param('address') address: string,
  ): Promise<GetBalanceResponse> {
    return this.providerFactory.getProvider(coin).getBalance(address);
  }
}
