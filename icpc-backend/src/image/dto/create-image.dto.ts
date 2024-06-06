import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateImageDto {
  @ApiProperty()
  @IsString()
  assetName: string;

  @ApiProperty()
  data: BinaryType;
}
