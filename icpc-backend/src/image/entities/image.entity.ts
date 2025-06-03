import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { News } from '../../news/entities/news.entity';

/*
Input: assetName (string), hash (string), mimeType (string), size (number), news (array of News)
Output: Image entity with relations to news
Return value: Image entity for database persistence
Function: Represents the structure and relationships of the image entity in the system
Variables: assetName, hash, mimeType, size, news
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Entity()
export class Image extends BaseEntity {
  @Column({ nullable: false })
  assetName: string;

  @Column({ nullable: false })
  hash: string;

  @Column({ nullable: false })
  mimeType: string;

  @Column({ nullable: false })
  size: number;

  @OneToMany(() => News, news => news.imageId)
  news: News[];
}
