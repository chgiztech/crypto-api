import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @CreateDateColumn()
  public readonly createdAt?: Date;

  @UpdateDateColumn()
  public readonly updatedAt?: Date;
}
