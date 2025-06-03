import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { Role } from '../../roles/entities/role.entity';
import { Excercise } from '../../excercises/entities/excercise.entity';

/*
Input:
  - name: User's first name (string)
  - lastName: User's last name (string)
  - userName: Username (string, unique)
  - email: User's email address (string, unique)
  - password: User's password (string)
  - role: Reference to the user's role (Role entity)
  - excercises: Array of Excercise entities associated with this user
Output:
  - User entity instance with all fields and relationships
Return value: Entity representing a user in the system, linked to roles and exercises
Function: Defines the structure and relationships for user records in the database, including personal information, authentication, role, and associated exercises
Variables: name, lastName, userName, email, password, role, excercises
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul

Description:
  The User entity models a user in the system, specifying personal information, authentication credentials, role association, and relationships to exercises. Used for authentication, authorization, and user management throughout the application.
*/
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

  // un usuario puede tener muchos ejercicios
  @OneToMany(() => Excercise, excercise => excercise.user)
  excercises: Excercise[];
}
