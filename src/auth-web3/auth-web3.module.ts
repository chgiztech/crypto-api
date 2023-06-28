import { Module } from '@nestjs/common';
import { TokenEntity } from 'entities';
import { EthModule } from '@/eth/eth.module';
import { UsersModule } from '@/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthWeb3Controller } from './auth-web3.controller';
import { AuthWeb3Service } from './auth-web3.service';
import { JwtConfigModule } from '@/config/jwt/jwt-config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    EthModule,
    UsersModule,
    JwtConfigModule,
  ],
  controllers: [AuthWeb3Controller],
  providers: [AuthWeb3Service],
})
export class AuthWeb3Module {}
