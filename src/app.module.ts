import { BitcoinConfigModule } from './config/bitcoin/bitcoin.config-module';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { AuthWeb3Module } from './auth-web3/auth-web3.module';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [
    BitcoinConfigModule,
    ProviderModule,
    AuthModule,
    AuthWeb3Module,
    UsersModule,
  ],
})
export class AppModule {}
