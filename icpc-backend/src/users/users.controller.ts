import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Auth } from '../common/decorators/auth.decorator';
import { RoleEnum } from '../common/enums/role.enum';
import { LoggerService } from 'src/services/logger.service';

@Controller('users') // This is the path that will be used for all the endpoints in this controller.
@Auth(RoleEnum.ADMIN) // This is the role that will be used for all the endpoints in this controller.
@ApiTags('User') // This is the name of the tag for all the endpoints in this controller.
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly loggerService: LoggerService
  ) {}

  @ApiBearerAuth()
  @Post('') // Endpoint for a post request to create a user, at "/users/user"
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The user has been successfully created.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(@Body() createUserDto: CreateUserDto, @Req() req: any) {
    const newUser = await this.usersService.create(createUserDto);
    this.loggerService.logChange('users', 'create', req.user.name, newUser.id);
    return newUser;
  }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The users has been successfully retrieved.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The user has been successfully retrieved.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The user has been successfully updated.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any
  ) {
    const modifiedUser = await this.usersService.update(id, updateUserDto);
    this.loggerService.logChange('users', 'update', req.user.name, id);
    return modifiedUser;
  }

  @Delete(':id/:user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The user has been successfully deleted.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async remove(
    @Param('id') id: string,
    @Param('user') user: string,
    @Req() req: any
  ) {
    const deletedUser = await this.usersService.remove(id, user);
    this.loggerService.logChange('users', 'delete', req.user.name, id);
    return deletedUser;
  }
}
