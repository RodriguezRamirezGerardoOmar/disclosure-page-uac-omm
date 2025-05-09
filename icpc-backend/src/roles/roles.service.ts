import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

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
    if (!role) {
      return null;
    }
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
