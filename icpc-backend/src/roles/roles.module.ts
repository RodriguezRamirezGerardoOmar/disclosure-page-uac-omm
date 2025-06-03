import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

/*
Roles module: configures the integration of the Role entity and service for managing user roles. Exposes the roles service and uses TypeORM for persistence.
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
