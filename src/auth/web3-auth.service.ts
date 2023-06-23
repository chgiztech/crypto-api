import { EthereumService } from '@/ethereum/ethereum.service';
import { TokenService } from '@/token/token.service';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Web3LoginDto } from './dto/web3-login.dto';

@Injectable()
export class Web3AuthService {
  private readonly signMessage = 'Authentication';

  constructor(
    private readonly web3: EthereumService,
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  public async web3Login(web3LoginDto: Web3LoginDto, res: Response) {
    const address = this.web3.eth.accounts
      .recover(this.web3.utils.toHex(this.signMessage), web3LoginDto.signature)
      .toLowerCase();

    let user = await this.usersService.findByAddress({ address });

    if (!user) {
      user = await this.usersService.createByAddress({ address });
    }

    const tokens = await this.tokenService.getjwtTokens(user, res);
    await this.tokenService.saveRefreshToken(user, tokens.refreshToken);
    return tokens;
  }
}
