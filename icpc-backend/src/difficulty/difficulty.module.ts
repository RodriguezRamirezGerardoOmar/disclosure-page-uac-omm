import { Module } from '@nestjs/common';
import { DifficultyService } from './difficulty.service';
import { DifficultyController } from './difficulty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Difficulty } from './entities/difficulty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Difficulty])],
  controllers: [DifficultyController],
  providers: [DifficultyService],
  exports: [DifficultyService]
})
export class DifficultyModule {}
