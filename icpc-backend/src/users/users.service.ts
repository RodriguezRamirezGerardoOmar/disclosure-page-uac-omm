import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';

// This file contains all the logic to perform the database queries.

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const username = await this.findOneByUsername(createUserDto.username); // check if username exists
    const email = await this.findOneByEmail(createUserDto.email); // check if email exists
    if (username !== null) {
      throw new BadRequestException('Username already exists'); // throw error if username exists
    } else if (email !== null) {
      throw new BadRequestException('Email already exists'); // throw error if email exists
    }
    const user = this.userRepository.create(createUserDto); // create user object
    user.password = await bcrypt.hash(user.password, 10); // hash password
    const userRole = await this.roleRepository.findOne({
      where: { id: user.id } // find the user's role in the 'role' table by the user's id
    });
    if (userRole) {
      user.role = userRole; // assign the user's role to the user object
    }
    const newUser = await this.userRepository.save(user); // save the user object to the database
    return {
      // return the user object
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: {
        id: newUser.role.id,
        name: newUser.role.role
      }
    };
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
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id: String(id) });
    return await this.userRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return await this.userRepository.remove(user);
  }

  async findOneByUsername(username: string) {
    if (!username) {
      return null; // return null if username is not provided
    }
    const user = await this.userRepository // find the user in the 'user' table by the username
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role') // join the 'role' table to the 'user' table
      .where('user.username = :username', { username }) // find the user by the username
      .getMany();
    if (user.length === 0) {
      return null; // return null if no user is found
    }
    return user[0]; // return the first user object
  }
}
