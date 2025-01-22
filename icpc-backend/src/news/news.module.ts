import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './entities/news.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/image/entities/image.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { LoggerService } from '../services/logger.service'; // Importa el LoggerService

@Module({
  imports: [TypeOrmModule.forFeature([News, Image, Ticket, Comment, User])],
  controllers: [NewsController],
  providers: [NewsService, LoggerService], // Añade LoggerService a los proveedores
  exports: [NewsService]
})
export class NewsModule {}