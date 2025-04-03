import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDifficultyDto } from './dto/create-difficulty.dto';
import { UpdateDifficultyDto } from './dto/update-difficulty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Difficulty } from './entities/difficulty.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  Ticket,
  TicketOperation,
  TicketStatus,
  TicketType
} from 'src/ticket/entities/ticket.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';

@Injectable()
export class DifficultyService {
  constructor(
    @InjectRepository(Difficulty)
    private readonly difficultyRepository: Repository<Difficulty>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Excercise)
    private readonly excerciseRepository: Repository<Excercise>
  ) {}

  async create(createDifficultyDto: CreateDifficultyDto) {
    const trimmedName = createDifficultyDto.name.trim();
    if (trimmedName.length === 0) {
      throw new BadRequestException(
        'El nombre de la dificultad no puede estar vacío o contener solo espacios.'
      );
    }

    if (createDifficultyDto.level < 0) {
      throw new BadRequestException(
        'El nivel de dificultad debe ser mayor o igual a 0.'
      );
    }

    // Verificar si ya existe un registro con el mismo nombre o nivel de dificultad
    const existingDifficulty = await this.difficultyRepository.findOne({
      where: [
        { name: trimmedName },
        { level: createDifficultyDto.level }
      ]
    });
    if (existingDifficulty) {
      throw new BadRequestException(
        'Una dificultad con ese nombre o nivel ya existe.'
      );
    }

    const savedDifficulty = await this.difficultyRepository.save({
      ...createDifficultyDto,
      name: trimmedName
    });
    if (savedDifficulty) {
      const ticketCommentBody = `La dificultad ${savedDifficulty.name} ha sido creada`;
      const comment = this.commentRepository.create({
        body: ticketCommentBody
      });
      const savedComment = await this.commentRepository.save(comment);
      const ticket = this.ticketRepository.create({
        otherId: savedDifficulty.id,
        operation: TicketOperation.CREATE,
        status: TicketStatus.ACCEPTED,
        itemType: TicketType.UTILS,
        commentId: savedComment
      });
      await this.ticketRepository.save(ticket);
      return savedDifficulty;
    } else {
      throw new BadRequestException('Error al crear la dificultad');
    }
  }

  async findAll() {
    return await this.difficultyRepository
      .createQueryBuilder('difficulty')
      .orderBy('difficulty.level', 'ASC')
      .getMany();
  }

  async findOne(id: string) {
    return await this.difficultyRepository.findOneBy({ id });
  }

  async update(id: string, updateDifficultyDto: UpdateDifficultyDto) {
    const trimmedName = updateDifficultyDto.name.trim();
    if (trimmedName.length === 0) {
      throw new BadRequestException(
        'El nombre de la dificultad no puede estar vacío o contener solo espacios.'
      );
    }

    if (updateDifficultyDto.level < 0) {
      throw new BadRequestException(
        'El nivel de dificultad debe ser mayor o igual a 0.'
      );
    }

    // Verificar si ya existe un registro con el mismo nombre o nivel de dificultad
    const existingDifficulty = await this.difficultyRepository.findOne({
      where: { level: updateDifficultyDto.level }
    });
    if (existingDifficulty && existingDifficulty.id !== id) {
      throw new BadRequestException('Una dificultad con ese nivel ya existe.');
    }

    const name = await this.difficultyRepository.findOne({
      where: { name: trimmedName }
    });
    if (name && name.id !== id) {
      throw new BadRequestException('Una dificultad con ese nombre ya existe.');
    }

    const difficulty = await this.difficultyRepository.findOneBy({ id });
    const savedDifficulty = await this.difficultyRepository.save({
      ...difficulty,
      ...updateDifficultyDto,
      name: trimmedName
    });
    if (savedDifficulty) {
      const ticketCommentBody = `La dificultad ${savedDifficulty.name} ha sido actualizada`;
      const comment = this.commentRepository.create({
        body: ticketCommentBody
      });
      const savedComment = await this.commentRepository.save(comment);
      const ticket = this.ticketRepository.create({
        otherId: savedDifficulty.id,
        operation: TicketOperation.UPDATE,
        status: TicketStatus.ACCEPTED,
        itemType: TicketType.UTILS,
        commentId: savedComment
      });
      await this.ticketRepository.save(ticket);
      return savedDifficulty;
    } else {
      throw new BadRequestException('Error al actualizar la dificultad');
    }
  }

  async remove(id: string) {
    const allDifficulties = await this.difficultyRepository.find();
    if (allDifficulties.length === 1) {
      throw new BadRequestException('No se puede eliminar la única dificultad');
    }
    let pivot = allDifficulties[0];
    if (pivot.id === id) {
      pivot = allDifficulties[1];
    }
    const difficulty = await this.difficultyRepository
      .createQueryBuilder('difficulty')
      .where('difficulty.id = :id', { id })
      .leftJoinAndSelect('difficulty.excercises', 'excercises')
      .getOne();
    const ticketCommentBody = `La dificultad ${difficulty.name} ha sido eliminada`;
    const comment = this.commentRepository.create({ body: ticketCommentBody });
    const savedComment = await this.commentRepository.save(comment);
    const ticket = this.ticketRepository.create({
      operation: TicketOperation.DELETE,
      status: TicketStatus.ACCEPTED,
      itemType: TicketType.UTILS,
      commentId: savedComment
    });
    if (ticket) {
      if (difficulty.excercises.length > 0) {
        for (const excercise of difficulty.excercises) {
          excercise.difficulty = pivot;
          await this.excerciseRepository.save(excercise);
        }
      }
      return await this.difficultyRepository.remove(difficulty);
    } else {
      throw new BadRequestException('Error al eliminar la dificultad');
    }
  }
}