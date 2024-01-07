import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [AuthModule, UsersModule, ProviderModule],
})
export class AppModule {}
