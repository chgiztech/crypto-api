import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { AuthWeb3Module } from './auth-web3/auth-web3.module';
import { BridgeModule } from '@/bridge/bridge.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [AuthModule, AuthWeb3Module, BridgeModule, UsersModule],
})
export class AppModule {}
