import { PassportEntity, RoleEntity, UserEntity } from '@entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthereumController } from './ethereum.controller';
import { EthereumService } from './ethereum.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, PassportEntity])],
  controllers: [EthereumController],
  providers: [EthereumService],
  exports: [EthereumService],
})
export class EthereumModule {}
