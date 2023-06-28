import { CoinEnum, NetEnum } from '@/common/enums';
import { ApiProperty } from '@nestjs/swagger';

export class GetBalanceDto {
  @ApiProperty()
  public readonly address: string;

  @ApiProperty()
  public readonly network: NetEnum;

  @ApiProperty()
  public readonly coin: CoinEnum;
}
