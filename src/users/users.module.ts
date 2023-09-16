import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportEntity, TokenEntity, UserEntity } from 'entities';
import { UsersService } from './users.service';
import { TypeOrmInfraModule } from '@/config/typeorm/typeorm.infra-module';

@Module({
  imports: [
    TypeOrmInfraModule,
    TypeOrmModule.forFeature([UserEntity, TokenEntity, PassportEntity]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
