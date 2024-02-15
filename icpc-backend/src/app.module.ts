import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: process.env.DATABASE_TYPE as 'mysql', // Asegúrate de que el tipo coincida con tu base de datos
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT, // El signo + convierte el string a número
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: true,
        autoLoadEntities: true
      })
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    CategoriesModule,
    NotesModule,
    CommentModule,
    MemoryModule,
    TimeModule,
    DifficultyModule,
    TagsModule
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
