import { Module } from '@nestjs/common';

import { BridgeModule } from '@/bridge/bridge.module';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [BridgeModule, UsersModule, AuthModule],
})
export class AppModule {}
