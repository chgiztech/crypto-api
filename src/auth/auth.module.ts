import { Module } from '@nestjs/common';
import { TokenEntity } from 'entities';
import { UsersModule } from '@/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/Jwt.strategy';
import { JwtConfigModule } from '@/config/jwt/jwt.config-module';
import { TypeOrmInfraModule } from '@/config/typeorm/typeorm.infra-module';
import { AuthWeb3Service } from './auth-web3.service';

@Module({
  imports: [
    UsersModule,
    JwtConfigModule,
    TypeOrmInfraModule,
    TypeOrmModule.forFeature([TokenEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthWeb3Service],
})
export class AuthModule {}
