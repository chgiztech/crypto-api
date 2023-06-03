import { Module } from '@nestjs/common';

import { EtheriumModule } from '@/etherium/etherium.module';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [EtheriumModule, UsersModule, AuthModule],
})
export class AppModule {}
