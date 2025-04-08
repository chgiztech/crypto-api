import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportHistoryEntity, UserEntity } from '@entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PassportHistoryEntity])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
