import { Body, Controller, Get, HttpStatus, Post, Req } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RoleEnum } from '../common/enums/role.enum';
import { CreateUserResponseDto } from '../users/dto/create-user.dto';
import { Auth } from 'src/common/decorators/auth.decorator';

interface RequestWithUser extends Request {
  user: {
    username: string;
    email: string;
    role: string;
  };
}

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Login successful'
  })
  async login(@Body() loginDto: LoginDto) {
    const response = await this.authService.login(loginDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: {
        user: response.user,
        token: response.token
      }
    };
  }

  @Post('register')
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
    type: CreateUserResponseDto
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: Error
  })
  async register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);
    const response = await this.authService.register(registerDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User has been successfully created',
      data: {
        id: response.id,
        username: response.username,
        email: response.email,
        role: {
          id: response.role.id,
          name: response.role.name
        }
      }
    };
  }

  @Get('profile')
  @Auth(RoleEnum.USER)
  @ApiResponse({
    status: 200,
    description: 'User profile',
    type: CreateUserResponseDto
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async profile(@Req() req: RequestWithUser) {
    const userData = await this.authService.profile(req.user);
    return {
      statusCode: HttpStatus.OK,
      message: 'User profile',
      data: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        role: userData.role.role
      }
    };
  }
}
