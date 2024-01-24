import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';

@Entity()
export class Note extends BaseEntity {
  // TODO: CATEGORY ID
  @Column({ unique: true, nullable: false })
  categoryId: string;

  @Column({ nullable: false })
  title: string;

  // TODO: COMMENT ID
  @Column({ unique: true, nullable: false })
  commentId: string;

  @Column({ nullable: false })
  body: string;

  @Column({ nullable: false })
  isVisible: boolean;
}
