import { ApiProperty } from '@nestjs/swagger';

export class GetBalanceResponse {
  @ApiProperty()
  public readonly amount: bigint;

  constructor(amount: bigint) {
    this.amount = amount;
  }
}
