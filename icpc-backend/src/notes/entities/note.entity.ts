import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';

@Entity()
export class Note extends BaseEntity {
  // TODO: Add category ID as a foreign key, change type
  @Column({ unique: true, nullable: false })
  categoryId: string;

  @Column({ nullable: false })
  title: string;

  // TODO: Add comment ID as a foreign key, change type
  @Column({ unique: true, nullable: false })
  commentId: string;

  @Column({ nullable: false })
  body: string;

  @Column({ nullable: false })
  isVisible: boolean;
}
