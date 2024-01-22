import { Column, Entity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../entities/base.entity';
import { RoleEnum } from '../../common/enums/role.enum';

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
