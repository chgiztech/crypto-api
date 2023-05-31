import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from './base.entity';
import { PassportEntity } from './passport.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'text', unique: true })
  public readonly username: string;

  @Column({ type: 'text', unique: true })
  public readonly email: string;

  @Column({ type: 'text' })
  public readonly password: string;

  @OneToOne(() => PassportEntity, passport => passport.user)
  passport: PassportEntity;
}
