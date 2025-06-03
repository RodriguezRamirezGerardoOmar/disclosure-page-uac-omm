/*
Inherity from CreateUserDto to create a new user for updating users.
*/

import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  editorId: string;

  @ApiProperty()
  @IsString()
  role: string;
}
