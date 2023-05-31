import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Entities from '@sergek/s3b/entity';
import { TypeORMConfig } from './typeorm.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: TypeORMConfig) => {
        const entities = Object.keys(Entities).map(
          entityKey => Entities[entityKey],
        );
        const subscribers = Object.keys(Subscribers).map(
          subscriberKey => Subscribers[subscriberKey],
        );

        return {
          type: 'postgres',
          ...config.fullConfig,
          entities,
          subscribers,
        };
      },
    }),
  ],
})
export class TypeORMInfraModule {}
