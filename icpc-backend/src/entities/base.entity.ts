import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    default: null
  })
  createdBy: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: null })
  updatedBy: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ default: null })
  deletedBy: string;
}
