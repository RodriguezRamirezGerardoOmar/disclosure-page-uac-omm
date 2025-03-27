import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Time } from './entities/time.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  Ticket,
  TicketOperation,
  TicketStatus,
  TicketType
} from 'src/ticket/entities/ticket.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';

@Injectable()
export class TimeService {
  constructor(
    @InjectRepository(Time)
    private readonly timeRepository: Repository<Time>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Excercise)
    private readonly excerciseRepository: Repository<Excercise>
  ) {}

  async create(createTimeDto: CreateTimeDto) {
    if (!createTimeDto.timeLimit) {
      throw new BadRequestException('El límite de tiempo debe ser un número');
    }
    if (createTimeDto.timeLimit <= 0) {
      throw new BadRequestException('El límite de tiempo debe ser mayor a 0');
    }

    // Verificar si ya existe un registro con el mismo timeLimit
    const existingTime = await this.timeRepository.findOneBy({
      timeLimit: createTimeDto.timeLimit
    });
    if (existingTime) {
      throw new BadRequestException('Ese límite de tiempo ya existe');
    }

    const newVal = await this.timeRepository.save(createTimeDto);
    if (newVal) {
      const ticketBody = `Se ha creado un nuevo límite de tiempo: ${newVal.timeLimit.toString()}`;
      const commentId = this.commentRepository.create({
        body: ticketBody
      });
      const savedComment = await this.commentRepository.save(commentId);
      if (savedComment) {
        const ticket = this.ticketRepository.create({
          otherId: newVal.id,
          operation: TicketOperation.CREATE,
          status: TicketStatus.ACCEPTED,
          itemType: TicketType.UTILS,
          commentId: savedComment
        });
        await this.ticketRepository.save(ticket);
      }
      return {
        id: newVal.id,
        timeLimit: newVal.timeLimit
      };
    }
  }

  async findAll() {
    return await this.timeRepository
      .createQueryBuilder('time')
      .orderBy('time.timeLimit', 'ASC')
      .getMany();
  }

  async findOne(id: string) {
    return await this.timeRepository.findOneBy({ id });
  }

  async findOneByValue(value: number) {
    if (!value) {
      return null; // return null if value is not provided
    } else {
      const category = await this.timeRepository.findOneBy({
        timeLimit: value
      });
      if (!category) {
        return null; // return null if category doesn't exist
      } else return category;
    }
  }

  async update(id: string, updateTimeDto: UpdateTimeDto) {
    if (!updateTimeDto.timeLimit) {
      throw new BadRequestException('El límite de tiempo debe ser un número');
    }
    if (updateTimeDto.timeLimit <= 0) {
      throw new BadRequestException('El límite de tiempo debe ser mayor a 0');
    }
    const existingTime = await this.timeRepository.findOneBy({
      timeLimit: updateTimeDto.timeLimit
    });
    if (existingTime !== null && existingTime.id !== id) {
      throw new BadRequestException('Ese límite de tiempo ya existe');
    }

    const time = await this.timeRepository.findOneBy({ id });
    const savedTime = await this.timeRepository.save({
      ...time,
      ...updateTimeDto
    });
    if (savedTime) {
      const ticketCommentBody = `El límite de tiempo ${savedTime.timeLimit.toString()} ha sido actualizado`;
      const comment = this.commentRepository.create({
        body: ticketCommentBody
      });
      const savedComment = await this.commentRepository.save(comment);
      const ticket = this.ticketRepository.create({
        otherId: savedTime.id,
        operation: TicketOperation.UPDATE,
        status: TicketStatus.ACCEPTED,
        itemType: TicketType.UTILS,
        commentId: savedComment
      });
      const savedTicket = await this.ticketRepository.save(ticket);
      if (savedComment && savedTicket) {
        return savedTime;
      }
    }
  }

  async remove(id: string) {
    const allTimeLimits = await this.timeRepository.find();
    if (allTimeLimits.length === 1) {
      throw new BadRequestException(
        'No se puede eliminar el único límite de tiempo'
      );
    }
    let pivot = allTimeLimits[0];
    if (pivot.id === id) {
      pivot = allTimeLimits[1];
    }
    const time = await this.timeRepository
      .createQueryBuilder('time')
      .where('time.id = :id', { id })
      .leftJoinAndSelect('time.excercises', 'excercises')
      .getOne();
    const ticketComment = `El límite de tiempo ${time.timeLimit.toString()} fue eliminado`;
    const commmentId = this.commentRepository.create({
      body: ticketComment
    });
    const savedComment = await this.commentRepository.save(commmentId);
    const ticket = this.ticketRepository.create({
      operation: TicketOperation.DELETE,
      status: TicketStatus.ACCEPTED,
      itemType: TicketType.UTILS,
      commentId: savedComment
    });
    if (ticket) {
      if (time.excercises.length > 0) {
        for (const excercise of time.excercises) {
          excercise.time = pivot;
          await this.excerciseRepository.save(excercise);
        }
      }
      return await this.timeRepository.remove(time);
    } else {
      throw new BadRequestException('Error al eliminar el límite de tiempo');
    }
  }
}
