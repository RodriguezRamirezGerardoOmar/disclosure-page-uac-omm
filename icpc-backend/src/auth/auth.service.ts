import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login({ username, email, password }: LoginDto) {
    let user = await this.usersService.findOneByEmail(email);
    if (user === null) {
      user = await this.usersService.findOneByUsername(username);
      if (user === null) {
        throw new BadRequestException('Invalid username or email');
      }
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = {
      username: user.username,
      email: user.email,
      role: user.role.role
    };

    const token = this.jwtService.sign(payload);

    return {
      user: {
        username: user.username,
        email: user.email,
        role: user.role.role
      },
      token
    };
  }

  async register(registerDto: RegisterDto) {
    return await this.usersService.create(registerDto);
  }

  async profile({ username, email }: { username: string; email: string }) {
    let user = await this.usersService.findOneByEmail(email);
    if (user === null) {
      user = await this.usersService.findOneByUsername(username);
      if (user === null) {
        throw new BadRequestException('Invalid username or email');
      }
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: {
        rolId: user.role.id,
        role: user.role.role
      }
    };
  }
}
