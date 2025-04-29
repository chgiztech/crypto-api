import { BadRequestException, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  EthGetBalanceRequestDto,
  EthGetBlockByNumberRequestDto,
  EthSendTransactionRequestDto,
} from './dto/ethereum.dto';

@Injectable()
export class EthereumService {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
  }

  async getBalance(dto: EthGetBalanceRequestDto) {
    if (!ethers.isAddress(dto.address)) {
      throw new BadRequestException('Invalid ETH address');
    }

    const balance = ethers.formatEther(
      await this.provider.getBalance(dto.address),
    );

    const result = {
      balance,
    };

    return result;
  }

  async sendTransaction(dto: EthSendTransactionRequestDto) {
    const wallet = new ethers.Wallet(dto.from, this.provider);

    const tx = {
      to: dto.to,
      value: ethers.parseEther(dto.value),
    };

    const transactionResponse = await wallet.sendTransaction(tx);

    const result = {
      hash: transactionResponse.hash,
    };

    return result;
  }

  async getBlockByNumber(dto: EthGetBlockByNumberRequestDto) {
    const block = await this.provider.getBlock(dto.blockNumber);
    return block;
  }

  async getLatestBlock() {
    const latestBlock = await this.provider.getBlock('latest');
    return latestBlock;
  }
}
