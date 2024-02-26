import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true, nullable: false })
  userName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => Role, role => role.users)
  role: Role;
  user: Role[];
}
