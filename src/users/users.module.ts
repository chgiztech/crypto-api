import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { TypeOrmGlobalModule } from 'config';

@Module({
  imports: [TypeOrmGlobalModule],
  controllers: [],
  providers: [UsersService],
})
export class UsersModule {}
