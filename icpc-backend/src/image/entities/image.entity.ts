import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';

@Entity()
export class Image extends BaseEntity {
  @Column({ nullable: false })
  assetName: string;

  @Column('blob', { nullable: false })
  data: BinaryType;
}
