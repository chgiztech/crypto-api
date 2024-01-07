import { JwtConfigModule } from '@/config/jwt/jwt.config-module';
import { TypeOrmInfraModule } from '@/config/typeorm/typeorm.infra-module';
import { EthereumModule } from '@/eth/eth.module';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from 'entities';
import { AuthWeb3Service } from './auth-web3.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/Jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtConfigModule,
    EthereumModule,
    TypeOrmInfraModule,
    TypeOrmModule.forFeature([TokenEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthWeb3Service],
})
export class AuthModule {}
