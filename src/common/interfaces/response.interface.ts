import { ApiProperty } from '@nestjs/swagger';

export class Response<TValue> {
  @ApiProperty()
  public readonly success: boolean;
  @ApiProperty()
  public readonly value: TValue;

  constructor() {
    this.success = true;
  }
}
