import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Image } from '../image/entities/image.entity';
import { Repository, Like } from 'typeorm';
import {
  Ticket,
  TicketOperation,
  TicketStatus,
  TicketType
} from 'src/ticket/entities/ticket.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {}
  async create(createNewsDto: CreateNewsDto) {
    const news = await this.newsRepository.findOneBy({
      title: createNewsDto.title
    });
    if (news !== null) {
      throw new BadRequestException('Una noticia con este título ya existe');
    } else {
      const image = await this.imageRepository.findOneBy({
        id: createNewsDto.imageId
      });
      const news = this.newsRepository.create({
        ...createNewsDto,
        imageId: image
      });
      news.isVisible = true;
      const user = await this.userRepository.findOneBy({
        userName: createNewsDto.userAuthor
      });
      news.created_by = user.name;
      const savedNews = await this.newsRepository.save(news);
      const commentBody = `${user.name} ha creado una nueva noticia con el título ${news.title}`;
      const comment = this.commentRepository.create({
        body: commentBody
      });
      const commentId = await this.commentRepository.save(comment);
      const ticket = this.ticketRepository.create({
        itemType: TicketType.NEWS,
        operation: TicketOperation.CREATE,
        status:
          createNewsDto.role === 'admin'
            ? TicketStatus.ACCEPTED
            : TicketStatus.PENDING,
        originalNewsId: news,
        commentId: commentId
      });
      const savedTicket = await this.ticketRepository.save(ticket);
      if (savedNews && savedTicket) {
        return savedNews;
      } else {
        throw new BadRequestException('Error al crear la noticia');
      }
    }
  }

  async findAll() {
    const res = await this.newsRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.imageId', 'image')
      .select(['news', 'image.id'])
      .where('news.isVisible = :isVisible', { isVisible: true })
      .orderBy('news.created_at', 'DESC')
      .getMany();
    return res;
  }

  async findOne(id: string) {
    const res = await this.newsRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.imageId', 'image')
      .select(['news', 'image.id'])
      .where('news.id = :newsId', { newsId: id })
      .getOne();
    return res;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    const image = await this.imageRepository.findOneBy({
      id: updateNewsDto.imageId
    });
    if (!image) {
      throw new BadRequestException('Image not found');
    }
    const news = await this.newsRepository.findOneBy({ id });
    return await this.newsRepository.save({
      ...news,
      ...updateNewsDto,
      imageId: image
    });
  }

  async remove(id: string, user: string) {
    const news = await this.newsRepository.findOneBy({ id: id });
    const userId = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId: user })
      .leftJoinAndSelect('user.role', 'role')
      .getOne();
    if (userId.role.role === 'admin') {
      const commentBody = `${userId.name} ha eliminado la noticia con el título ${news.title}`;
      const comment = this.commentRepository.create({
        body: commentBody
      });
      const commentId = await this.commentRepository.save(comment);
      const ticket = this.ticketRepository.create({
        itemType: TicketType.NEWS,
        operation: TicketOperation.DELETE,
        status: TicketStatus.ACCEPTED,
        originalNewsId: news,
        commentId: commentId
      });
      const savedTicket = await this.ticketRepository.save(ticket);
      if (savedTicket) {
        return await this.newsRepository.remove(news);
      } else {
        throw new BadRequestException('Error al eliminar la noticia');
      }
    } else {
      const commentBody = `${userId.name} ha eliminado la noticia con el título ${news.title}`;
      const comment = this.commentRepository.create({
        body: commentBody
      });
      const commentId = await this.commentRepository.save(comment);
      const ticket = this.ticketRepository.create({
        itemType: TicketType.NEWS,
        operation: TicketOperation.DELETE,
        status: TicketStatus.PENDING,
        originalNewsId: news,
        commentId: commentId
      });
      const savedTicket = await this.ticketRepository.save(ticket);
      if (savedTicket) {
        return savedTicket;
      }
    }
  }

  async search(query: string): Promise<News[]> {
    return this.newsRepository.find({
      where: { title: Like(`%${query}%`) },
      take: 5
    });
  }

  async getCount(): Promise<number> {
    return await this.newsRepository.countBy({ isVisible: true });
  }

  async swapImage(newsId: string, imageId: string) {
    const news = await this.newsRepository.findOneBy({ id: newsId });
    const image = await this.imageRepository.findOneBy({ id: imageId });
    news.imageId = image;
    return await this.newsRepository.save(news);
  }
}
