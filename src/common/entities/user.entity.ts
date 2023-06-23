import { Entity, Column, OneToOne } from 'typeorm';
import BaseEntity from './base.entity';
import { PassportEntity } from './passport.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'text', unique: true, nullable: true })
  public readonly username: string;

  @Column({ type: 'text', unique: true, nullable: true })
  public readonly email: string;

  @OneToOne(() => PassportEntity, passport => passport.user)
  public readonly passport: PassportEntity;

  @Column({ type: 'text', nullable: true })
  public readonly address?: string;

  //   @OneToOne(() => TokenEntity, token => token.user)
  //   public readonly token: TokenEntity;
}
