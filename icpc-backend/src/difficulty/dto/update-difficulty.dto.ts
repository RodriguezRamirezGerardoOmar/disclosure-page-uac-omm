/*
Inherited from CreateDifficultyDto this class is used to update an existing difficulty level in the system.
*/

import { PartialType } from '@nestjs/swagger';
import { CreateDifficultyDto } from './create-difficulty.dto';

export class UpdateDifficultyDto extends PartialType(CreateDifficultyDto) {}
