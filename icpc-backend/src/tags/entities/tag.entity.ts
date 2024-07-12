import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Tag extends BaseEntity {
  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, unique: true })
  color: string;

  @ManyToMany(() => Tag, tag => tag.excercises)
  excercises: Tag[];

  @ManyToMany(() => Tag, tag => tag.notes)
  notes: Tag[];
}
