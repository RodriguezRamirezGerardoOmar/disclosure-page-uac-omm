import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

export class CreateNoteDto {
  // TODO: Add category id as foreign key, change type
  @ApiProperty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsString()
  title: string;

  // TODO: Add comment id as foreign key, change type
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsBoolean()
  isVisible: boolean;
}

export class CreateNoteResponseDto extends CreateNoteDto {}

export class NoteResponseCategoryDto extends IntersectionType(
  CreateNoteDto,
  CreateCategoryDto
) {}
