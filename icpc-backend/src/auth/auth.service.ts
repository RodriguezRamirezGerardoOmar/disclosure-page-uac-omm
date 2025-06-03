import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

/*
Input:
  - login: username (optional, string), email (optional, string, email format), password (string)
  - register: name (string), lastName (string), userName (string), email (string), password (string), passwordVerify (string), isAdmin (boolean)
  - profile: id (string)
Output:
  - login: Object with authenticated user data (userName, email, role, name, lastName) and JWT token
  - register: Object with created user data
  - profile: Object with user profile data
Return value: Service methods for authentication, registration, and user profile retrieval
Function: Manages user authentication, registration, and profile, validating credentials and generating JWT tokens
Variables: usersService, jwtService, user, token, payload
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login({ username, email, password }: LoginDto) {
    let user = await this.usersService.findOneByEmail(email);

    // If user is not found by email, check if the username is an email or a username
    if (user === null) {
      // Check if the username input is in email format
      const isUsernameEmail = username && /\S+@\S+\.\S+/.test(username);

      if (isUsernameEmail) {
        // If username is an email, search user by email
        user = await this.usersService.findOneByEmail(username);
      } else {
        // If username is not an email, search user by username
        user = await this.usersService.findOneByUsername(username);
      }

      // If user is still not found, throw an exception
      if (user === null) {
        throw new BadRequestException('Usuario o correo inválido');
      }
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      // If password does not match, throw an exception
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      id: user.id,
      username: user.userName,
      email: user.email,
      role: user.role.role,
      name: user.name,
      lastName: user.lastName
    };

    const token = this.jwtService.sign(payload);

    return {
      user: {
        userName: user.userName,
        email: user.email,
        role: user.role.role,
        name: user.name,
        lastName: user.lastName
      },
      token
    };
  }

  async register(registerDto: RegisterDto) {
    // Call the usersService to create a new user with the provided registration data
    return await this.usersService.create(registerDto);
  }
  async profile({ id }: { id: string }) {
    const user = await this.usersService.findOneById(id);
    // If the user is not found, throw an exception
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    // If the user is found, return the profile data
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      role: {
        rolId: user.role.id,
        role: user.role.role
      }
    };
  }
}
