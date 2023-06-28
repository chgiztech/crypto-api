import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthWeb3Service } from './auth-web3.service';
import { AuthWeb3Response } from './auth-web3.response';
import { Web3LoginDto } from './dto/web3-login.dto';

@Controller('auth-web3')
export class AuthWeb3Controller {
  constructor(private readonly authWeb3Service: AuthWeb3Service) {}

  @Post('login')
  public async web3Login(
    @Body() web3LoginDto: Web3LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return new AuthWeb3Response(
      await this.authWeb3Service.web3Login(web3LoginDto, res),
    );
  }
}
