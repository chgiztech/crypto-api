import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Entities from 'entities';
import { TypeOrmConfig } from './typeorm.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        {
          module: class TypeOrmModule {},
          providers: [TypeOrmConfig],
          exports: [TypeOrmConfig],
        },
      ],
      inject: [TypeOrmConfig],
      useFactory: (config: TypeOrmConfig) => {
        const entities = Object.keys(Entities).map(
          entityKey => Entities[entityKey],
        );

        return {
          type: 'postgres',
          ...config.fullSettings,
          entities,
        };
      },
    }),
  ],
})
export class TypeOrmInfraModule {}
