import { PartialType } from '@nestjs/swagger';
import { CreateFactDto } from './create-fact.dto';

export class UpdateFactDto extends PartialType(CreateFactDto) {
  text?: string;
}
