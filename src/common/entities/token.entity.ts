import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import BaseEntity from './base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'token' })
export class TokenEntity  extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  public readonly saveRefreshToken: string;

  @OneToOne(() => UserEntity, user => user.passport)
  @JoinColumn({ name: 'user' })
  public readonly user: UserEntity;
}
