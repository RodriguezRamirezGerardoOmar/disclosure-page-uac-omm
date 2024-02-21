import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';

// This file contains all the data properties and validation requirements for the user object.

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  username: string;

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
  'password'
] as const) {} // exclude the password property from the response

export class UserResponseRoleDto extends IntersectionType(
  CreateUserDto,
  CreateRoleDto
) {}
