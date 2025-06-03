/*
Inherits the properties of CreateCommentDto, allowing partial updates of comment fields.
*/
import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
