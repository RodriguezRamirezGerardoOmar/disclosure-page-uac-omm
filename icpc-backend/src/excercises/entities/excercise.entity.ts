import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@Entity()
export class Excercise extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  input: string;

  @Column({ nullable: false })
  output: string;

  @Column({ nullable: false })
  constraints: string;

  @Column({ nullable: false })
  example_input: string;

  @Column({ nullable: false })
  example_output: string;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false })
  solution: string;

  @ManyToOne(() => User, user => user.excercises)
  user: User;

  @ManyToMany(() => Category, category => category.excercises)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Tag, tag => tag.excercises)
  @JoinTable()
  tags: Tag[];
}
