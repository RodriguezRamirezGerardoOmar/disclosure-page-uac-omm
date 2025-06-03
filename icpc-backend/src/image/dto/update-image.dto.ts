/*
Inherity from CreateImageDto to allow partial updates
*/
import { PartialType } from '@nestjs/swagger';
import { CreateImageDto } from './create-image.dto';

export class UpdateImageDto extends PartialType(CreateImageDto) {}
