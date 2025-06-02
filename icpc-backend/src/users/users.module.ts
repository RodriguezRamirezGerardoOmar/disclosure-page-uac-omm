import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { LoggerService } from 'src/services/logger.service';

/*
Users module: configures the integration of the User entity and related services for managing users, roles, comments, and tickets. Exposes the users service and uses TypeORM for persistence.
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Comment, Ticket])],
  controllers: [UsersController],
  providers: [UsersService, LoggerService],
  exports: [UsersService]
})
export class UsersModule {}
