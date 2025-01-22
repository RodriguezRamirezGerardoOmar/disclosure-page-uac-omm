import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Category } from './src/categories/entities/category.entity';
import { Excercise } from './src/excercises/entities/excercise.entity';
import { Role } from './src/roles/entities/role.entity';
import { User } from './src/users/entities/user.entity';
import { Comment } from './src/comment/entities/comment.entity';
import { Ticket } from './src/ticket/entities/ticket.entity';
import { Tag } from './src/tags/entities/tag.entity';
import { News } from './src/news/entities/news.entity';
import { Memory } from './src/memory/entities/memory.entity';
import { Report } from './src/report/entities/report.entity';
import { Difficulty } from './src/difficulty/entities/difficulty.entity';
import { Note } from './src/notes/entities/note.entity';
import { Image } from './src/image/entities/image.entity';
import { Time } from './src/time/entities/time.entity';

export const AppDataSourceForSeed = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'icpc-backend',
  synchronize: true,
  logging: false, // Desactiva el logging
  entities: [
    Category,
    Excercise,
    Role,
    User,
    Comment,
    Ticket,
    Tag,
    News,
    Memory,
    Report,
    Difficulty,
    Note,
    Image,
    Time,
  ],
  migrations: ['./src/migrations/*.ts'],
});