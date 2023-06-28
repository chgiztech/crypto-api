import { Module } from '@nestjs/common';
import { TokenEntity } from 'entities';
import { UsersModule } from '@/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/Jwt.strategy';
import { TypeOrmGlobalModule } from '@/config/typeorm/typeorm-config.module';
import { JwtConfigModule } from '@/config/jwt/jwt-config.module';

@Module({
    imports: [
        UsersModule,
    JwtConfigModule,
    TypeOrmGlobalModule,
    TypeOrmModule.forFeature([TokenEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
