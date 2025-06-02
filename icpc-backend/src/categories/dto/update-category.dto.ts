/*
Inherits the properties of CreateCategoryDto, allowing partial updates of category fields.
*/

import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
