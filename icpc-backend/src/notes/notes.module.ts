import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Category } from '../categories/entities/category.entity';
import { Comment } from '../comment/entities/comment.entity';
import { CommentService } from 'src/comment/comment.service';
import { Tag } from 'src/tags/entities/tag.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';
import { LoggerService } from '../services/logger.service';
import { MailerService } from 'src/mailer/mailer.service';
import { Role } from 'src/roles/entities/role.entity';
import { MailerModule } from 'src/mailer/mailer.module';
import { UsersService } from 'src/users/users.service';

/*
Input:
  - Entities: Note, Category, Comment, Ticket, User, Tag, Role
  - Services: NotesService, CommentService, LoggerService, MailerService, UsersService
  - Controllers: NotesController
  - Modules: MailerModule
Output:
  - Exports NotesService for use in other modules
  - Registers NotesController for handling note-related endpoints
  - Provides all required services for note management and related features
Return value: Notes module that encapsulates all logic, data access, and endpoints for notes, including related entities and services
Function: Organizes and wires up all dependencies for notes functionality, including database entities, business logic, controllers, and external modules (mailer)
Variables: NotesService, NotesController, CommentService, LoggerService, MailerService, UsersService, TypeOrmModule, MailerModule
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul

Description:
  The NotesModule is responsible for grouping all components related to notes, including the Note entity, its controller, and services for business logic, comments, logging, mailing, and user management. It imports all necessary entities for TypeORM, integrates the MailerModule for email notifications, and exports the NotesService for use in other modules. This module ensures that all dependencies for note management are properly configured and available throughout the application.
*/

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Note,
      Category,
      Comment,
      Ticket,
      User,
      Tag,
      Role
    ]),
    MailerModule
  ],
  controllers: [NotesController],
  providers: [
    NotesService,
    CommentService,
    LoggerService,
    MailerService,
    UsersService
  ],
  exports: [NotesService]
})
export class NotesModule {}