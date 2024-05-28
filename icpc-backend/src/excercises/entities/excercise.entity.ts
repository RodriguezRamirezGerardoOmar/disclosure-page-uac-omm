import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne
} from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Difficulty } from 'src/difficulty/entities/difficulty.entity';
import { Time } from 'src/time/entities/time.entity';
import { Memory } from 'src/memory/entities/memory.entity';

@Entity()
export class Excercise extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column('text', { nullable: false })
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

  @Column('text', { nullable: false })
  solution: string;

  @ManyToOne(() => User, user => user.excercises)
  user: User;

  @ManyToOne(() => Category, category => category.excercises)
  @JoinTable()
  category: Category;

  @ManyToOne(() => Difficulty, difficulty => difficulty.excercises)
  @JoinTable()
  difficulty: Difficulty;

  @ManyToOne(() => Memory, memory => memory.excercises)
  @JoinTable()
  memoryId: Memory;

  @ManyToOne(() => Time, time => time.excercises)
  @JoinTable()
  time: Time;

  @ManyToMany(() => Tag, tag => tag.excercises)
  @JoinTable()
  tags: Tag[];
}
