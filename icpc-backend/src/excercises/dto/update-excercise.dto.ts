/*
Inherits the properties of CreateExcerciseDto, allowing partial updates of exercise fields.
*/

import { PartialType } from '@nestjs/swagger';
import { CreateExcerciseDto } from './create-excercise.dto';

export class UpdateExcerciseDto extends PartialType(CreateExcerciseDto) {}
