import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  name: string;

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
}

export class CreateUserResponseDto extends OmitType(CreateUserDto, [
  'password'
] as const) {}

export class UserResponseRoleDto extends IntersectionType(
  CreateUserDto,
  CreateRoleDto
) {}
