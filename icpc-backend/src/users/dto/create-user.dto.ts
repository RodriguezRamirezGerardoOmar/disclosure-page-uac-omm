import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';

/*
Input:
  - name: User's first name (string, min 3 characters)
  - lastName: User's last name (string, min 3 characters)
  - userName: Username (string, min 3 characters)
  - email: User's email address (string, valid email)
  - password: User's password (string)
  - passwordVerify: Password confirmation (string)
  - isAdmin: Boolean indicating if the user is an admin
Output:
  - Data Transfer Object (DTO) for creating a user
Return value: Object containing the required fields to create a user
Function: Defines the structure and validation rules for user creation requests
Variables: name, lastName, userName, email, password, passwordVerify, isAdmin
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  lastName: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  userName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  passwordVerify: string;

  @ApiProperty()
  @IsBoolean()
  isAdmin: boolean;
}

export class CreateUserResponseDto extends OmitType(CreateUserDto, [
  'password',
  'passwordVerify',
  'isAdmin'
] as const) {} // exclude the password property from the response

export class UserResponseRoleDto extends IntersectionType(
  CreateUserDto,
  CreateRoleDto
) {}
