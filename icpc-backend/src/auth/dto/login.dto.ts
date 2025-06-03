import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

/*
Input: username (optional, string), email (optional, string, email format), password (string, minimum 8 characters)
Output: Object with authenticated user information (userName, email, role) and authentication token
Return value: DTO for login and login response
Function: Receives user credentials for authentication and returns user data along with the JWT token
Variables: username, email, password, user, token
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export class LoginDto {
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(8)
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    type: 'object',
    properties: {
      userName: { type: 'string' },
      email: { type: 'string' },
      role: { type: 'string' }
    }
  })
  user: {
    userName: string;
    email: string;
    role: string;
  };
  @ApiProperty()
  token: string;
}
