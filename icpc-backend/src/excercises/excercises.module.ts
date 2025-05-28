import { Module, forwardRef } from '@nestjs/common';
import { ExcercisesService } from './excercises.service';
import { ExcercisesController } from './excercises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Excercise } from './entities/excercise.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Difficulty } from 'src/difficulty/entities/difficulty.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { AppModule } from '../app.module';
import { TicketService } from 'src/ticket/ticket.service';
import { Note } from 'src/notes/entities/note.entity';
import { News } from 'src/news/entities/news.entity';
import { Image } from 'src/image/entities/image.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { Role } from 'src/roles/entities/role.entity';
import { MailerModule } from 'src/mailer/mailer.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Excercise,
      Category,
      Tag,
      Difficulty,
      Ticket,
      User,
      Comment,
      Note,
      News,
      Image,
      Role
    ]),
    forwardRef(() => AppModule),
    MailerModule
  ],
  controllers: [ExcercisesController],
  providers: [ExcercisesService, TicketService, MailerService, UsersService],
  exports: [ExcercisesService]
})
export class ExcercisesModule {}
