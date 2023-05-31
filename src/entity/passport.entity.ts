import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import BaseEntity from './base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'passport' })
export class PassportEntity extends BaseEntity {
  @Column({ type: 'text' })
  password: string;

  @OneToOne(() => UserEntity, user => user.passport)
  @JoinColumn({ name: 'user' })
  user: UserEntity;
}
