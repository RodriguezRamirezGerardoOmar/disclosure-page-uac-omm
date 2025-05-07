import { Module, forwardRef } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { CategoriesModule } from './categories/categories.module';
import { NotesModule } from './notes/notes.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { MemoryModule } from './memory/memory.module';
import { TimeModule } from './time/time.module';
import { DifficultyModule } from './difficulty/difficulty.module';
import { TagsModule } from './tags/tags.module';
import { ExcercisesModule } from './excercises/excercises.module';
import { ImageModule } from './image/image.module';
import { NewsModule } from './news/news.module';
import { TicketModule } from './ticket/ticket.module';
import { ReportModule } from './report/report.module';
import { LoggerService } from './services/logger.service';
import { FactsModule } from './facts/facts.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: process.env.DATABASE_TYPE as 'mysql',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: true,
        autoLoadEntities: true
      })
    }),
    MailerModule,
    AuthModule,
    UsersModule,
    RolesModule,
    CategoriesModule,
    NotesModule,
    CommentModule,
    MemoryModule,
    TimeModule,
    DifficultyModule,
    TagsModule,
    forwardRef(() => ExcercisesModule),
    ImageModule,
    NewsModule,
    TicketModule,
    ReportModule,
    FactsModule
  ],
  providers: [LoggerService],
  exports: [LoggerService]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
