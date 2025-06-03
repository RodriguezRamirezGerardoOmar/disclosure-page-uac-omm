/*
News module: configures the integration of the news service and controller for managing news items, images, tickets, comments, and users in the system. Uses TypeORM for persistence and imports the mailer module for notifications.
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './entities/news.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/image/entities/image.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { LoggerService } from '../services/logger.service';
import { ImageService } from 'src/image/image.service';
import { MailerService } from 'src/mailer/mailer.service';
import { MailerModule } from 'src/mailer/mailer.module';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([News, Image, Ticket, Comment, User, Role]),
    MailerModule
  ],
  controllers: [NewsController],
  providers: [
    NewsService,
    LoggerService,
    ImageService,
    MailerService,
    UsersService
  ],
  exports: [NewsService]
})
export class NewsModule {}
