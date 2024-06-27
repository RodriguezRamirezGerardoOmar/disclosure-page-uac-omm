import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { Image } from 'src/image/entities/image.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';

@Entity()
export class News extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column('text', { nullable: false })
  body: string;

  @ManyToOne(() => Image, image => image.news)
  @JoinTable()
  imageId: string;

  @Column({ nullable: false })
  isVisible: boolean;

  @OneToMany(() => Ticket, ticket => ticket.originalNewsId)
  ticketOriginal: Ticket[];

  @OneToMany(() => Ticket, ticket => ticket.modifiedNewsId)
  ticketModified: Ticket[];
}
