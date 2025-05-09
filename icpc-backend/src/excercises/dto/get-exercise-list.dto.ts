import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class GetExerciseListDto {
  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsArray()
  tags: {
    id: string;
    name: string;
    color: string;
  }[];

  @ApiProperty()
  @IsString()
  difficulty: string;
}
