import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtConfig } from './jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [
        {
          module: class JwtModule {},
          providers: [JwtConfig],
          exports: [JwtConfig],
        },
      ],
      inject: [JwtConfig],
      useFactory: (config: JwtConfig) => {
        const { secret, expiresIn } = config.accessToken;

        return {
          secret,
          signOptions: {
            expiresIn,
          },
        };
      },
    }),
  ],
  providers: [JwtConfig],
  exports: [JwtConfig, JwtModule],
})
export class JwtConfigModule {}
