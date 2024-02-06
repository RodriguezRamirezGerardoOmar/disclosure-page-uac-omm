import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  name: string;

  // TODO: Add comment id as foreign key, change type
  @ApiProperty()
  @IsString()
  commentId: string;
}
