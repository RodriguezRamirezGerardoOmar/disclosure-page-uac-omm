import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

/*
Input:
  - create: createRoleDto (role data)
  - findAll: none
  - findOne: id (string)
  - update: id (number), updateRoleDto (fields to update)
  - remove: id (number)
Output:
  - create: Created role object
  - findAll: List of all roles (currently returns a string)
  - findOne: Found role or null
  - update: Updated role
  - remove: String indicating removal (should be updated to return deleted role)
Return value: Service providing business logic and data access for roles, including creation, retrieval, update, and deletion
Function: Handles all CRUD operations for roles, manages the Role entity, and integrates with TypeORM for persistence
Variables: roleRepository
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    this.roleRepository.save(role);
    return {
      id: role.id,
      role: role.role
    };
  }

  findAll() {
    return `This action returns all roles`;
  }

  async findOne(id: string) {
    const role = await this.roleRepository.findOne({ where: { id } });
    // If the role is not found, return null
    if (!role) {
      return null;
    }
    // If the role is found, return its id and role name
    return {
      id: role.id,
      role: role.role
    };
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({
      where: { id: String(id) }
    });
    return await this.roleRepository.save({ ...role, ...updateRoleDto });
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
