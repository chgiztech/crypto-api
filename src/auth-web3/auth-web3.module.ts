import { JwtConfigModule } from '@/config/jwt/jwt-config.module';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from 'entities';
import { AuthWeb3Controller } from './auth-web3.controller';
import { AuthWeb3Service } from './auth-web3.service';
import { EthereumModule } from '@/ethereum/ethereum.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    EthereumModule,
    UsersModule,
    JwtConfigModule,
  ],
  controllers: [AuthWeb3Controller],
  providers: [AuthWeb3Service],
})
export class AuthWeb3Module {}
