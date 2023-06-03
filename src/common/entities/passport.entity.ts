import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import BaseEntity from './base.entity';
import { UserEntity } from './user.entity';

export enum PassportTypeEnum {
  JWT = 'jwt',
}

@Entity({ name: 'passport' })
export class PassportEntity extends BaseEntity {
  @Column({ type: 'text' })
  public readonly password: string;

  @OneToOne(() => UserEntity, user => user.passport)
  @JoinColumn({ name: 'user' })
  public readonly user: UserEntity;

  @Column({ type: 'varchar' })
  public readonly type: PassportTypeEnum;
}
