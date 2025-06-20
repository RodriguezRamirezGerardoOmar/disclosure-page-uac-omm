import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { MailerService } from './mailer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { UsersService } from 'src/users/users.service';

/*
Mailer module: configures the integration of the mailer service for sending emails, and sets up TypeORM for user, role, comment, and ticket entities. Uses Gmail as the email transport provider.
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: 'gmail',
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
          }
        }
      })
    }),
    TypeOrmModule.forFeature([User, Role, Comment, Ticket])
  ],
  providers: [MailerService, UsersService],
  controllers: []
})
export class MailerModule {}
