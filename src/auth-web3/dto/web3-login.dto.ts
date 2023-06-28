import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined } from 'class-validator';

export class Web3LoginDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  public readonly signature: string;
}
