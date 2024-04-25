import { Category } from 'src/categories/entities/category.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @Column({ nullable: false })
  body: string;

  // un comentario solo puede pertenecer a una categoria
  @OneToOne(() => Category, category => category.comment)
  category: Category;
}
