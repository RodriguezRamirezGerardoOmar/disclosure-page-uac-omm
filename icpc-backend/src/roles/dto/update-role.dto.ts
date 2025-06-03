/*
Inherity from CreateRoleDto to create a new role for updating roles.
*/

import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
