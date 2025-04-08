import { PassportEntity, PassportHistoryEntity, UserEntity } from '@entity';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

const relations = ['passport', 'role', 'creator'];

@Injectable()
export class UsersService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(PassportHistoryEntity)
    private readonly passportHistoryRepo: Repository<PassportHistoryEntity>,
  ) {}

  async findById(id: number): Promise<UserEntity | null> {
    const result = await this.userRepo.findOne({
      where: { id },
      relations,
    });
    if (result?.isDeleted) {
      throw new UnauthorizedException('USER_BLOCKED');
    }
    return result;
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const result = await this.userRepo.findOne({
      where: { username },
      relations,
    });
    if (result?.isDeleted) {
      throw new UnauthorizedException('USER_BLOCKED');
    }
    return result;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const result = await this.userRepo.findOne({
      where: { email },
      relations,
    });
    if (result?.isDeleted) {
      throw new UnauthorizedException('USER_BLOCKED');
    }
    return result;
  }

  async passwordUsedPreviously(userId: number, password: string) {
    const passportHistories = await this.passportHistoryRepo.find({
      where: {
        user: { id: userId },
      },
      order: {
        createdAt: 'DESC',
      },
      take: 3,
    });

    const checkPasswords = await Promise.all(
      passportHistories.map((ph) => bcrypt.compare(password, ph.password)),
    );

    const alreadyUsed = checkPasswords.includes(true);

    return alreadyUsed;
  }

  async updateUserPassword(
    userId: number,
    passportId: number,
    password: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const passwordHash = await bcrypt.hash(password, 8);

    try {
      await queryRunner.manager.save(PassportEntity, {
        id: passportId,
        password: passwordHash,
      });

      await queryRunner.manager.insert(PassportHistoryEntity, {
        password: passwordHash,
        user: { id: userId },
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(err);
    } finally {
      await queryRunner.release();
    }
  }

  async blockById(id: number): Promise<void> {
    await this.userRepo.update(
      { id },
      {
        isDeleted: true,
      },
    );
  }

  async updateLastFailedLoginTime(id: number): Promise<void> {
    await this.userRepo.update(
      { id },
      {
        lastFailedLoginTime: new Date(),
      },
    );
  }
}
