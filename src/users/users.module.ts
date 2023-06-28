import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportEntity, TokenEntity, UserEntity } from 'entities';
import { UsersService } from './users.service';
import { TypeOrmGlobalModule } from '@/config/typeorm/typeorm-config.module';

@Module({
  imports: [
    TypeOrmGlobalModule,
    TypeOrmModule.forFeature([UserEntity, TokenEntity, PassportEntity]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
