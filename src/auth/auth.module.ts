import { Module } from '@nestjs/common';

import { TokenModule } from '@/token/token.module';
import { UsersModule } from '@/users/users.module';

import { EthereumModule } from '@/ethereum/ethereum.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './utils/Jwt.strategy';
import { Web3AuthService } from './web3-auth.service';

@Module({
  imports: [EthereumModule, UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, Web3AuthService, JwtStrategy],
})
export class AuthModule {}
