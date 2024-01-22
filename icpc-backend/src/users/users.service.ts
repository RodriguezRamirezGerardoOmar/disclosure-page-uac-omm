import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const username = await this.findOneByUsername(createUserDto.username);
    const email = await this.findOneByEmail(createUserDto.email);
    if (username !== null) {
      throw new BadRequestException('Username already exists');
    } else if (email !== null) {
      throw new BadRequestException('Email already exists');
    }
    const user = this.userRepository.create(createUserDto);
    user.password = await bcrypt.hash(user.password, 10);
    const userRole = await this.roleRepository.findOne({
      where: { id: user.id }
    });
    if (userRole) {
      user.role = userRole;
    }
    const newUser = await this.userRepository.save(user);
    return {
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
      return null;
    }
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.email = :email', { email })
      .getMany();
    if (user.length === 0) {
      return null;
    }
    return user[0];
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
      return null;
    }
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.username = :username', { username })
      .getMany();
    if (user.length === 0) {
      return null;
    }
    return user[0];
  }
}
