import { Module } from '@nestjs/common';
import { TimeService } from './time.service';
import { TimeController } from './time.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Time } from './entities/time.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Time, Comment, Ticket, Excercise])],
  controllers: [TimeController],
  providers: [TimeService],
  exports: [TimeService]
})
export class TimeModule {}
