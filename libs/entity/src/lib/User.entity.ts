import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from './Role.entity';
import { PassportEntity } from './Passport.entity';

export const UserPropertiesToBase64Cipher = ['email', 'firstName', 'lastName'];

export function CipherToBase64(value: string): string {
  return Buffer.from(value).toString('base64');
}

export function DecipherFromBase64ToUtf8(value: string): string {
  return Buffer.from(value, 'base64').toString('utf8');
}

export const transformerLowercase = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  to(value: any): any {
    const cased = String(value).trim().toLowerCase();
    return CipherToBase64(cased);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from(value: any): any {
    if (!value) {
      return null;
    }
    return DecipherFromBase64ToUtf8(value);
  },
};

export const transformer = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  to(value: any): any {
    return CipherToBase64(value);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from(value: any): any {
    if (!value) {
      return null;
    }
    return DecipherFromBase64ToUtf8(value);
  },
};

export const transformerUId = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  to(value: any): any {
    if (!value) {
      return null;
    }
    return bcrypt.hashSync(value, process.env['HASH_SALT']!);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  from(_value: any): any {
    return '************';
  },
};

export function getUIdHash(UId: string) {
  return bcrypt.hashSync(UId, process.env['HASH_SALT']!);
}

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({
    type: 'text',
    unique: true,
    transformer: transformerLowercase,
  })
  email: string;

  @Column({
    name: 'first_name',
    transformer,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    transformer,
  })
  lastName: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @Column({ name: 'last_failed_login_time', nullable: true })
  lastFailedLoginTime: Date | null;

  // Секретные данные
  @OneToOne(() => PassportEntity, (passport) => passport.user)
  passport?: PassportEntity;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role?: RoleEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'creator_id' })
  creator?: UserEntity | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
