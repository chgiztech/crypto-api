import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { validateResponse } from 'libs/utils/src';
import {
  EthGetBalanceRequestDto,
  EthGetBalanceResponseDto,
  EthGetBlockByNumberRequestDto,
  EthGetBlockResponseDto,
  EthSendTransactionRequestDto,
  EthSendTransactionResponseDto,
} from './ethereum.dto';
import { EthereumService } from './ethereum.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('ethereum')
@UseGuards(JwtAuthGuard)
@Controller('ethereum')
export class EthereumController {
  constructor(private readonly ethereumService: EthereumService) {}

  @ApiOperation({
    summary: 'Баланс по адресу',
  })
  @ApiResponse({
    type: () => EthGetBalanceResponseDto,
  })
  @Get('balance')
  async getBalance(@Query() dto: EthGetBalanceRequestDto) {
    const result = await this.ethereumService.getBalance(dto);
    return await validateResponse<EthGetBalanceResponseDto>(
      EthGetBalanceResponseDto,
      result,
    );
  }

  @ApiOperation({
    summary: 'Отправка транзакции',
  })
  @ApiResponse({
    type: () => EthSendTransactionResponseDto,
  })
  @Post('transaction')
  async sendTransaction(@Body() dto: EthSendTransactionRequestDto) {
    const result = await this.ethereumService.sendTransaction(dto);
    return await validateResponse<EthSendTransactionResponseDto>(
      EthSendTransactionResponseDto,
      result,
    );
  }

  @ApiOperation({
    summary: 'Получение блока по номеру',
  })
  @ApiResponse({
    type: () => EthGetBlockResponseDto,
  })
  @Get('block')
  async getBlockByNumber(@Query() dto: EthGetBlockByNumberRequestDto) {
    const result = await this.ethereumService.getBlockByNumber(dto);
    return await validateResponse<EthGetBlockResponseDto>(
      EthGetBlockResponseDto,
      result,
    );
  }

  @ApiOperation({
    summary: 'Получение последнего блока',
  })
  @ApiResponse({
    type: () => EthGetBlockResponseDto,
  })
  @Get('latest-block')
  async getLatestBlock() {
    const result = await this.ethereumService.getLatestBlock();
    return await validateResponse<EthGetBlockResponseDto>(
      EthGetBlockResponseDto,
      result,
    );
  }
}
