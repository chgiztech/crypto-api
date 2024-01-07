import { EthereumService } from '@/eth/eth.service';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'entities';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Web3LoginDto } from './dto/web3-login.dto';

@Injectable()
export class AuthWeb3Service {
  constructor(
    private readonly ethereumService: EthereumService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  public async web3Login(web3LoginDto: Web3LoginDto, res: Response) {
    const address = this.ethereumService.getAddress(web3LoginDto.signature);

    let user = (await this.usersService.findByAddress({
      address,
    })) as UserEntity;

    if (!user) {
      user = await this.usersService.createByAddress({ address });
    }

    const tokens = await this.authService.getjwtTokens(user, res);
    await this.authService.saveRefreshToken(user, tokens.refreshToken);
    return tokens;
  }
}
