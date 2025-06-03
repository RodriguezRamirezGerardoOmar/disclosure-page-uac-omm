import { Column, Entity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../entities/base.entity';
import { RoleEnum } from '../../common/enums/role.enum';

/*
Input:
  - role: Role assigned to the user (enum: RoleEnum, default USER)
  - users: Array of User entities associated with this role
Output:
  - Role entity instance with all fields and relationships
Return value: Entity representing a user role in the system, linked to users
Function: Defines the structure and relationships for role records in the database, including role type and associated users
Variables: role, users
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Entity()
export class Role extends BaseEntity {
  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER
  })
  role: RoleEnum;

  @OneToMany(() => User, user => user.role)
  users: User[];
}
