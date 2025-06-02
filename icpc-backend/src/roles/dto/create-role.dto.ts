import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RoleEnum } from 'src/common/enums/role.enum';

/*
Input:
  - role: Role to be assigned (enum: RoleEnum)
Output:
  - Data Transfer Object (DTO) for creating a role
Return value: Object containing the required field to create a role
Function: Defines the structure and validation rules for role creation requests
Variables: role
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export class CreateRoleDto {
  @ApiProperty({
    enum: RoleEnum,
    default: RoleEnum.USER
  })
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
