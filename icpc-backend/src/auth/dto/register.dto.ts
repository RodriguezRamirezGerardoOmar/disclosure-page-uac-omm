/*
Input: name (string, minimum 2 characters), lastName (string, minimum 2 characters), userName (string, minimum 3 characters), email (string, email format), password (string, minimum 8 characters), passwordVerify (string, minimum 8 characters), isAdmin (boolean)
Output: DTO object with the necessary data to register a user
Return value: DTO for user registration
Function: Receives the required data to create a new user in the system
Variables: name, lastName, userName, email, password, passwordVerify, isAdmin
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(2)
  lastName: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  userName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(8)
  passwordVerify: string;

  @ApiProperty()
  @IsBoolean()
  isAdmin: boolean;
}
