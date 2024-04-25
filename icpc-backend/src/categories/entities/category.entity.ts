import { Excercise } from 'src/excercises/entities/excercise.entity';
import { BaseEntity } from '../../entities/base.entity';
import { Column, Entity, ManyToMany, OneToOne } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @ManyToMany(() => Excercise, excercise => excercise.categories)
  excercises: Excercise[];

  // una categoria puede tener solo un comentario
  @OneToOne(() => Comment, comment => comment.category)
  comment: Comment;
}
