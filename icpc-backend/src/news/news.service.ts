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
    console.log(news);
    if (news !== null) {
      throw new BadRequestException('Una noticia con este título ya existe');
    } else {
      return await this.newsRepository.save(createNewsDto);
    }
  }

  async findAll() {
    return await this.newsRepository.find();
  }

  async findOne(id: string) {
    return await this.newsRepository.findOneBy({ id: id });
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
