/*
Inherity from CreateTicketDto this file is used to update a ticket.
*/
import { PartialType } from '@nestjs/swagger';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {}
