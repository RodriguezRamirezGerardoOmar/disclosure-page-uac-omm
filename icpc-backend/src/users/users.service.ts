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

/*
Input:
  - create: createUserDto (user data)
  - findAll: none
  - findOneByEmail: email (string)
  - findOne: id (string)
  - getMails: adminsOnly (boolean)
  - update: id (string), updateUserDto (fields to update)
  - remove: id (string), userId (string)
  - findOneByUsername: username (string)
  - findOneById: id (string)
Output:
  - create: Created user object or error
  - findAll: List of all users
  - findOneByEmail: Found user or null
  - findOne: Found user with details
  - getMails: List of user emails
  - update: Updated user or error
  - remove: Deleted user or error
  - findOneByUsername: Found user or null
  - findOneById: Found user or null
Return value: Service providing business logic and data access for users, including creation, retrieval, update, deletion, and email retrieval
Function: Handles all CRUD operations for users, manages the User entity, and integrates with related entities (roles, comments, tickets) for persistence and business logic
Variables: userRepository, roleRepository, commentRepository, ticketRepository
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul

Description:
  The UsersService encapsulates all business logic and data access for users. It manages user creation, retrieval, updating, deletion, and email retrieval, and interacts with related entities such as roles, comments, and tickets. The service ensures data integrity, validation, and proper handling of user operations, including password hashing, role assignment, and logging changes for auditing purposes.
*/

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
    // Check if the username already exists
    const username = await this.findOneByUsername(createUserDto.userName);
    // Check if the email already exists
    const email = await this.findOneByEmail(createUserDto.email);
    if (username !== null) {
      // If the username exists, throw an exception
      throw new BadRequestException('El nombre de usuario ya existe');
    } else if (email !== null) {
      // If the email exists, throw an exception
      throw new BadRequestException('El email ya existe');
    }
    // Check if the password is at least 8 characters
    if (createUserDto.password.length < 8) {
      throw new BadRequestException(
        'La contraseña debe tener al menos 8 caracteres'
      );
    }
    // Check if the password and passwordVerify match
    if (createUserDto.password === createUserDto.passwordVerify) {
      // If passwords match, proceed to create the user
      const user = this.userRepository.create(createUserDto);
      const role = createUserDto.isAdmin ? RoleEnum.ADMIN : RoleEnum.USER;
      user.password = await bcrypt.hash(user.password, 10);
      const userRole = await this.roleRepository.findOne({
        where: { role: role }
      });
      if (userRole) {
        // If the user role exists, assign it
        user.role = userRole;
      }
      const newUser = await this.userRepository.save(user);
      if (newUser) {
        // If the user is saved, create a comment and ticket
        const commentBody = `${newUser.name} ha sido creado`;
        const comment = this.commentRepository.create({ body: commentBody });
        const savedComment = await this.commentRepository.save(comment);
        const ticket = this.ticketRepository.create({
          operation: TicketOperation.CREATE,
          commentId: savedComment,
          itemType: TicketType.USER,
          status: TicketStatus.ACCEPTED,
          otherId: newUser.id
        });
        await this.ticketRepository.save(ticket);
        return {
          id: newUser.id,
          name: newUser.name,
          lastName: newUser.lastName,
          userName: newUser.userName,
          email: newUser.email
        };
      }
    } else {
      // If passwords do not match, throw an exception
      throw new BadRequestException('Las contraseñas no coinciden');
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string) {
    // If email is not provided, return null
    if (!email) {
      return null;
    }
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.email = :email', { email })
      .getMany();
    // If no user is found, return null
    if (user.length === 0) {
      return null;
    }
    return user[0];
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

  async getMails(adminsOnly: boolean) {
    // Get users based on whether only admins are requested
    const users = adminsOnly
      ? await this.userRepository.find({
          where: { role: { role: RoleEnum.ADMIN } },
          select: ['email']
        })
      : await this.userRepository.find({
          select: ['email']
        });

    // If no users are found, throw an exception
    if (users.length === 0) {
      throw new BadRequestException('No se encontraron usuarios');
    }

    return users.map(user => user.email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password && updateUserDto.password.length < 8) {
      // If a new password is provided and is less than 8 characters, throw an exception
      throw new BadRequestException(
        'La contraseña debe tener al menos 8 caracteres'
      );
    }

    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      // If the user does not exist, throw an exception
      throw new BadRequestException('El usuario no existe');
    }

    if (updateUserDto.userName && updateUserDto.userName !== user.userName) {
      // If a new username is provided and is different, check if it already exists
      const existingUser = await this.userRepository.findOneBy({
        userName: updateUserDto.userName
      });
      if (existingUser) {
        // If the username already exists, throw an exception
        throw new BadRequestException('El nombre de usuario ya existe');
      }
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      // If a new email is provided and is different, check if it already exists
      const existingUser = await this.userRepository.findOneBy({
        email: updateUserDto.email
      });
      if (existingUser) {
        // If the email already exists, throw an exception
        throw new BadRequestException('El email ya existe');
      }
    }

    if (
      updateUserDto.password &&
      updateUserDto.password !== updateUserDto.passwordVerify
    ) {
      // If the new password and its verification do not match, throw an exception
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    let role = user.role;
    if (updateUserDto.isAdmin !== undefined) {
      // If isAdmin is provided, update the user's role
      role = await this.roleRepository.findOne({
        where: { role: updateUserDto.isAdmin ? RoleEnum.ADMIN : RoleEnum.USER }
      });

      if (!role) {
        // If the specified role does not exist, throw an exception
        throw new BadRequestException('El rol especificado no existe');
      }
    }

    const modifyUser = this.userRepository.create({
      ...user,
      name: updateUserDto.name || user.name,
      lastName: updateUserDto.lastName || user.lastName,
      userName: updateUserDto.userName || user.userName,
      email: updateUserDto.email || user.email,
      password: updateUserDto.password
        ? await bcrypt.hash(updateUserDto.password, 10)
        : user.password,
      role: role,
      updated_by: updateUserDto.editorId
    });

    await this.userRepository.save(modifyUser);

    const updatedUser = await this.userRepository.findOne({
      where: { id: modifyUser.id },
      relations: ['role']
    });

    if (!updatedUser?.role) {
      // If the updated user does not have a role, throw an exception
      throw new BadRequestException(
        'Error al cargar el rol del usuario actualizado'
      );
    }

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      userName: updatedUser.userName,
      email: updatedUser.email,
      role: updatedUser.role.role
    };
  }

  async remove(id: string, userId: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      // If the user to be deleted does not exist, throw an exception
      throw new BadRequestException('El usuario no existe');
    }

    const requestingUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('user.role', 'role')
      .getOne();

    if (!requestingUser) {
      // If the requesting user does not exist, throw an exception
      throw new BadRequestException('Usuario solicitante no encontrado');
    }

    const commentBody = `${requestingUser.userName} ha eliminado al usuario ${user.userName}`;
    const comment = this.commentRepository.create({ body: commentBody });
    const savedComment = await this.commentRepository.save(comment);

    const ticket = this.ticketRepository.create({
      operation: TicketOperation.DELETE,
      commentId: savedComment,
      itemType: TicketType.USER,
      status: TicketStatus.ACCEPTED,
      otherId: user.id
    });

    await this.ticketRepository.save(ticket);
    return await this.userRepository.remove(user);
  }

  async findOneByUsername(username: string) {
    // If username is not provided, return null
    if (!username) {
      return null;
    }
    // Query the user by username
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.userName = :username', { username })
      .getMany();
    // If no user is found, return null
    if (user.length === 0) {
      return null;
    }
    // Return the first user found
    return user[0];
  }
  async findOneById(id: string): Promise<User | null> {
    // If id is not provided, return null
    if (!id) {
      return null;
    }
    // Query the user by id
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.id = :id', { id })
      .getOne();
    // Return the user if found, otherwise return null
    return user || null;
  }
}
