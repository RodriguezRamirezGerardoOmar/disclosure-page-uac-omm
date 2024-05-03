import { Excercise } from 'src/excercises/entities/excercise.entity';
import { BaseEntity } from '../../entities/base.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Excercise, excercise => excercise.category)
  excercises: Excercise[];

  // una categoria puede tener solo un comentario
  @OneToOne(() => Comment, comment => comment.category)
  comment: Comment;
}
