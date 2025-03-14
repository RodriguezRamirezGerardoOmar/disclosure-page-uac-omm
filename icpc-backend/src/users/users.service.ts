import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  Ticket,
  TicketOperation,
  TicketStatus,
  TicketType
} from 'src/ticket/entities/ticket.entity';
import { isAbsolute } from 'path';
import { where } from 'sequelize';

// This file contains all the logic to perform the database queries.

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const username = await this.findOneByUsername(createUserDto.userName);
    const email = await this.findOneByEmail(createUserDto.email);
    if (username !== null) {
      throw new BadRequestException('El nombre de usuario ya existe');
    } else if (email !== null) {
      throw new BadRequestException('El email ya existe');
    }
    if (createUserDto.password === createUserDto.passwordVerify) {
      const user = this.userRepository.create(createUserDto);
      const role = createUserDto.isAdmin ? RoleEnum.ADMIN : RoleEnum.USER;
      user.password = await bcrypt.hash(user.password, 10);
      const userRole = await this.roleRepository.findOne({
        where: { role: role }
      });
      if (userRole) {
        user.role = userRole;
      }
      const newUser = await this.userRepository.save(user);
      return {
        // return the user object
        id: newUser.id,
        name: newUser.name,
        lastName: newUser.lastName,
        userName: newUser.userName,
        email: newUser.email,
        role: {
          id: newUser.role.id,
          name: newUser.role.role
        }
      };
    } else {
      throw new BadRequestException('Las contraseñas no coinciden');
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string) {
    if (!email) {
      return null; // return null if email is not provided
    }
    const user = await this.userRepository // find the user in the 'user' table by the email
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role') // join the 'role' table to the 'user' table
      .where('user.email = :email', { email }) // find the user by the email
      .getMany();
    if (user.length === 0) {
      return null; // return null if no user is found
    }
    return user[0]; // return the first user object
  }

  async findOne(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.id = :id', { id })
      .getOne();
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      isAdmin: user.role.role === RoleEnum.ADMIN
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id: id });

    // Verificar nombre de usuario
    if (updateUserDto.userName && updateUserDto.userName !== user.userName) {
      const existingUser = await this.userRepository.findOneBy({
        userName: updateUserDto.userName
      });
      if (existingUser) {
        throw new BadRequestException('El nombre de usuario ya existe');
      }
    }

    // Verificar email
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOneBy({
        email: updateUserDto.email
      });
      if (existingUser) {
        throw new BadRequestException('El email ya existe');
      }
    }

    const modifyUser = this.userRepository.create({
      ...user,
      name: updateUserDto.name,
      lastName: updateUserDto.lastName,
      userName: updateUserDto.userName,
      email: updateUserDto.email,
      password: updateUserDto.password
        ? await bcrypt.hash(updateUserDto.password, 10)
        : user.password,
      role: updateUserDto.isAdmin
        ? await this.roleRepository.findOne({ where: { role: RoleEnum.ADMIN } })
        : await this.roleRepository.findOne({ where: { role: RoleEnum.USER } })
    });
    const updatedUser = await this.userRepository.save({
      ...modifyUser
    });

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      userName: updatedUser.userName,
      email: updatedUser.email
    };
  }

  async remove(id: string, userId: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('El usuario no existe');
    }

    const requestingUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('user.role', 'role')
      .getOne();

    if (!requestingUser) {
      throw new BadRequestException('Usuario solicitante no encontrado');
    }

    const commentBody = `${requestingUser.name} ha eliminado al usuario ${user.userName}`;
    const comment = this.commentRepository.create({ body: commentBody });
    const savedComment = await this.commentRepository.save(comment);

    const ticket = this.ticketRepository.create({
      operation: TicketOperation.DELETE,
      commentId: savedComment,
      itemType: TicketType.USER,
      status: TicketStatus.ACCEPTED,
      otherId: user.id // Asegúrate de que la relación con el usuario sea correcta en tu entidad Ticket
    });

    await this.ticketRepository.save(ticket);
    return await this.userRepository.remove(user);
  }

  async findOneByUsername(username: string) {
    if (!username) {
      return null; // return null if username is not provided
    }
    const user = await this.userRepository // find the user in the 'user' table by the username
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role') // join the 'role' table to the 'user' table
      .where('user.userName = :username', { username }) // find the user by the username
      .getMany();
    if (user.length === 0) {
      return null; // return null if no user is found
    }
    return user[0]; // return the first user object
  }
}
