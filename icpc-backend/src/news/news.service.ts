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
    const { imageId, role, ...updateData } = updateNewsDto;

    // Verificar si la noticia existe
    const existingNews = await this.newsRepository.findOneBy({ id });
    if (!existingNews) {
      throw new BadRequestException('La noticia no existe');
    }

    // Verificar si la imagen existe
    const image = await this.imageRepository.findOneBy({ id: imageId });
    if (!image) {
      throw new BadRequestException('La imagen no existe');
    }

    const user = await this.userRepository.findOneBy({
      userName: updateData.userAuthor
    });

    if (role === 'admin') {
      existingNews.isVisible = false;
      await this.newsRepository.save(existingNews);

      // Actualizar la noticia existente
      // Crear una copia de la noticia modificada
      const modifiedNewsCopy = this.newsRepository.create({
        ...updateData,
        updated_by: user.id,
        imageId: image,
        id: undefined, // Evitar conflictos con el ID de la noticia original
        isVisible: true // Marcar la copia como visible
      });

      // Guardar la noticia actualizada en la base de datos
      const savedUpdatedNews = await this.newsRepository.save(modifiedNewsCopy);

      if (savedUpdatedNews) {
        const commentBody = `${updateData.userAuthor} ha actualizado la noticia con el título ${existingNews.title}`;
        const comment = this.commentRepository.create({
          body: commentBody
        });
        const commentId = await this.commentRepository.save(comment);
        const ticket = this.ticketRepository.create({
          itemType: TicketType.NEWS,
          operation: TicketOperation.UPDATE,
          status: TicketStatus.ACCEPTED,
          originalNewsId: existingNews,
          modifiedNewsId: savedUpdatedNews,
          commentId: commentId
        });
        const savedTicket = await this.ticketRepository.save(ticket);
        if (savedTicket) {
          return savedUpdatedNews;
        } else {
          throw new BadRequestException('Error al actualizar la noticia');
        }
      }
    } else {
      // Crear una copia de la noticia modificada
      const modifiedNewsCopy = this.newsRepository.create({
        ...updateData,
        updated_by: user.id,
        imageId: image,
        isVisible: false
      });
      const savedUpdatedNews = await this.newsRepository.save(modifiedNewsCopy);
      if (savedUpdatedNews) {
        const commentBody = `${updateData.userAuthor} ha actualizado la noticia con el título ${existingNews.title}`;
        const comment = this.commentRepository.create({
          body: commentBody
        });
        const commentId = await this.commentRepository.save(comment);
        const ticket = this.ticketRepository.create({
          itemType: TicketType.NEWS,
          operation: TicketOperation.UPDATE,
          status: TicketStatus.PENDING,
          originalNewsId: existingNews,
          modifiedNewsId: savedUpdatedNews,
          commentId: commentId
        });
        const savedTicket = await this.ticketRepository.save(ticket);
        if (savedTicket) {
          return savedUpdatedNews;
        } else {
          throw new BadRequestException('Error al actualizar la noticia');
        }
      }
    }
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
        deleted_at: new Date(),
        deleted_by: userId.id,
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
        deleted_at: new Date(),
        deleted_by: userId.id,
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
