import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';
import { Image } from 'src/image/entities/image.entity';

@Entity()
export class News extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column('text', { nullable: false })
  body: string;

  @ManyToOne(() => Image, image => image.news)
  @JoinTable()
  imageId: string;
}
