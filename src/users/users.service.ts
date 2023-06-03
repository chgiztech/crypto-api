import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { PassportEntity, PassportTypeEnum, UserEntity } from 'entities';

import { CreateUserDto } from './dto/create-user.dto';
import { FindOneInterface } from './interfaces/find-one.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(PassportEntity)
    private readonly passportRepository: Repository<PassportEntity>,
  ) {}

  public findOne(where: FindOneInterface): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where,
      relations: ['passport'],
    });
  }

  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const password = await this.generatePasswordHash(createUserDto.password);

    const user = await this.usersRepository.save({
      ...createUserDto,
      password,
    });

    await this.passportRepository.save({
      type: PassportTypeEnum.JWT,
      password,
      user,
    });

    return user;
  }

  public async generatePasswordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt<number>(5);
    return await bcrypt.hash<string>(password, salt);
  }
}
