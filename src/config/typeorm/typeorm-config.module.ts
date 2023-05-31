import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Entities from 'entity';
import { TypeOrmConfig } from './typeorm-config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: TypeOrmConfig) => {
        const entities = Object.keys(Entities).map(
          entityKey => Entities[entityKey],
        );

        return {
          type: 'postgres',
          ...config.getFullSettings,
          entities,
        };
      },
    }),
  ],
})
export class TypeOrmGlobalModule {}
