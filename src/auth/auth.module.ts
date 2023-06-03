import { Module } from '@nestjs/common';

import { TokenModule } from '@/token/token.module';
import { UsersModule } from '@/users/users.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './utils/Jwt.strategy';

@Module({
  imports: [UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
