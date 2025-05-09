import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOkResponse
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RoleEnum } from '../common/enums/role.enum';
import { CreateUserResponseDto } from '../users/dto/create-user.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthGuard } from './guard/auth.guard';

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
  @ApiCreatedResponse({
    description: 'Login successful',
    type: LoginResponseDto
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Invalid username or email' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Auth(RoleEnum.ADMIN)
  @ApiCreatedResponse({
    description: 'El usuario ha sido creado exitosamente',
    type: CreateUserResponseDto
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: Error
  })
  async register(
    @Body() registerDto: RegisterDto
  ): Promise<CreateUserResponseDto> {
    return await this.authService.register(registerDto);
  }

  @Get('profile')
  @Auth(RoleEnum.USER)
  @ApiOkResponse({
    description: 'User profile',
    type: CreateUserResponseDto
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async profile(@Req() req: RequestWithUser) {
    const userData = await this.authService.profile({ id: (req.user as any).id });
    return {
      id: userData.id,
      name: userData.name,
      lastName: userData.lastName,
      userName: userData.userName,
      email: userData.email,
      role: userData.role.role,
    };
  }
  
}
