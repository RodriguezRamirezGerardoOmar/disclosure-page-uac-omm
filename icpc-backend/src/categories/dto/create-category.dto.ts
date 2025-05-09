import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsObject, IsOptional, IsString, Matches } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @Matches(/[a-zA-Z]/)
  name: string;

  // TODO: Add comment id as foreign key, change type
  @ApiProperty()
  @IsString()
  commentId: string;
}
