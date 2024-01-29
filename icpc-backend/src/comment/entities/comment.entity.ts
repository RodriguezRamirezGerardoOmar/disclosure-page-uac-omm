import { BaseEntity } from 'src/entities/base.entity';
import { Column } from 'typeorm';

export class Comment extends BaseEntity {
  @Column({ nullable: false })
  body: string;
}
