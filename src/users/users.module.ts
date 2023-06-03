import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmGlobalModule } from 'config';
import { PassportEntity, TokenEntity, UserEntity } from 'entities';

import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmGlobalModule,
    TypeOrmModule.forFeature([UserEntity, TokenEntity, PassportEntity]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
