import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { News } from '../../news/entities/news.entity';

@Entity()
export class Image extends BaseEntity {
  @Column({ nullable: false })
  assetName: string;

  @Column('blob', { nullable: false })
  data: BinaryType;

  @OneToMany(() => News, news => news.imageId)
  news: News[];
}
