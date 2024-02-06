import { BaseEntity } from '../../entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  // TODO: Add comment ID as a foreign key, change type
  @Column({ nullable: false })
  commentId: string;
}
