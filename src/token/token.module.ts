import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenEntity } from 'entities';
import { JwtConfigModule, TypeOrmGlobalModule } from 'config';

import { TokenService } from './token.service';

@Module({
  imports: [
    JwtConfigModule,
    TypeOrmGlobalModule,
    TypeOrmModule.forFeature([TokenEntity]),
  ],
  providers: [TokenService],
  exports: [TokenService, JwtConfigModule],
})
export class TokenModule {}
