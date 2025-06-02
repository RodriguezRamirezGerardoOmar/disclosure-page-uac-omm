import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';

/*
Input:
  - create: createRoleDto (role data)
  - findAll: none
  - findOne: id (string)
  - update: id (string), updateRoleDto (fields to update)
  - remove: id (string)
Output:
  - create: Created role
  - findAll: List of roles
  - findOne: Found role
  - update: Updated role
  - remove: Deleted role
Return value: Roles controller with endpoints to create, retrieve, update, and delete roles
Function: Handles CRUD operations for roles, with admin authentication protection
Variables: rolesService
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul

Endpoints:
- POST /roles
  Description: Creates a new role
  Permission: ADMIN (authentication required)
  Input: createRoleDto
  Output: Created role

- GET /roles
  Description: Retrieves all roles
  Permission: ADMIN (authentication required)
  Output: List of roles

- GET /roles/:id
  Description: Retrieves a role by id
  Permission: ADMIN (authentication required)
  Output: Found role

- PATCH /roles/:id
  Description: Updates a role by id
  Permission: ADMIN (authentication required)
  Input: updateRoleDto
  Output: Updated role

- DELETE /roles/:id
  Description: Deletes a role by id
  Permission: ADMIN (authentication required)
  Output: Deleted role
*/
@Controller('roles')
@Auth(RoleEnum.ADMIN)
@ApiTags('Roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Query() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
