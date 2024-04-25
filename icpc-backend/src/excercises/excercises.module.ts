import { Module } from '@nestjs/common';
import { ExcercisesService } from './excercises.service';
import { ExcercisesController } from './excercises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Excercise } from './entities/excercise.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Excercise, Category, Tag])],
  controllers: [ExcercisesController],
  providers: [ExcercisesService],
  exports: [ExcercisesService]
})
export class ExcercisesModule {}
