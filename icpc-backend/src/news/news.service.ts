import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>
  ) {}
  async create(createNewsDto: CreateNewsDto) {
    const news = await this.newsRepository.findOneBy({
      title: createNewsDto.title
    });
    if (news !== null) {
      throw new BadRequestException('Una noticia con este título ya existe');
    } else {
      return await this.newsRepository.save(createNewsDto);
    }
  }

  async findAll() {
    const res = await this.newsRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.imageId', 'image')
      .select(['news', 'image.id'])
      .orderBy('news.created_at', 'DESC')
      .getMany();
    console.log(res);
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
    const news = await this.newsRepository.findOneBy({ id: id });
    return await this.newsRepository.save({ ...news, ...updateNewsDto });
  }

  async remove(id: string) {
    const news = await this.newsRepository.findOneBy({ id: id });
    return await this.newsRepository.remove(news);
  }
}
