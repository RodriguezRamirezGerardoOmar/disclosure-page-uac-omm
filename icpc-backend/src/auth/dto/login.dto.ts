import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

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
      username: { type: 'string' },
      email: { type: 'string' },
      role: { type: 'string' }
    }
  })
  user: {
    username: string;
    email: string;
    role: string;
  };
  @ApiProperty()
  token: string;
}
