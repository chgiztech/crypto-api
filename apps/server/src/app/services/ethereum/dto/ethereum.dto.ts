import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class EthGetBalanceRequestDto {
  @ApiProperty({
    description: 'ETH address',
    example: '0x1234567890abcdef1234567890abcdef12345631',
  })
  @IsString()
  readonly address: string;
}

export class EthGetBalanceResponseDto {
  @ApiProperty()
  @IsString()
  @Expose()
  readonly balance: string;
}

export class EthSendTransactionRequestDto {
  @ApiProperty({
    description: 'ETH address',
  })
  @IsString()
  readonly from: string;

  @ApiProperty({
    description: 'ETH address',
  })
  @IsString()
  readonly to: string;

  @ApiProperty({
    description: 'ETH amount',
  })
  @IsString()
  readonly value: string;
}

export class EthSendTransactionResponseDto {
  @ApiProperty({
    description: 'Transaction hash',
  })
  @IsString()
  @Expose()
  readonly hash: string;
}

export class EthGetBlockByNumberRequestDto {
  @ApiProperty({
    description: 'Block number',
    example: '0x12345678',
  })
  @IsString()
  readonly blockNumber: string;
}

export class EthGetBlockResponseDto {
  @ApiProperty({
    description: 'Block number',
    example: '0x12345678',
  })
  @IsString()
  @Expose()
  readonly blockNumber: string;

  @ApiProperty({
    description: 'Block hash',
    example: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef',
  })
  @IsString()
  @Expose()
  readonly blockHash: string;
}
