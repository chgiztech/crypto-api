import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeORMGlobalModule } from '@global';
import { Middleware } from 'libs/utils/src';
import { AppConfigModule } from '../config/global.infra-module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './services/auth/auth.module';
import { JwtAuthGuard } from './services/auth/jwt-auth.guard';
import { EthereumModule } from './services/ethereum/ethereum.module';

@Module({
  imports: [
    AppConfigModule,
    TypeORMGlobalModule,
    JwtModule.register({
      global: true,
      publicKey: String(process.env.JWT_PUBLIC).replace(/\\n/g, '\n'),
      privateKey: String(process.env.JWT_PRIVATE).replace(/\\n/g, '\n'),
      signOptions: {
        algorithm: 'RS256',
      },
    }),
    AuthModule,
    EthereumModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middleware).forRoutes('*');
  }
}
