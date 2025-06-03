import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Req
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TicketType } from './entities/ticket.entity';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { LoggerService } from 'src/services/logger.service';

enum ItemType {
  EXERCISE = 'Ejercicios',
  NOTE = 'Apuntes',
  NEWS = 'Noticias',
  UTILS = 'Utilidades',
  USER = 'Usuarios'
}

/*
Input:
  - create: createTicketDto (ticket data)
  - findAll: none
  - findPending: none
  - hasPendingTicket: itemId (string), itemType (string)
  - findOne: id (string)
  - approve: id (string), req (authenticated admin user)
  - reject: id (string), req (authenticated admin user)
  - update: id (string), updateTicketDto (fields to update)
  - remove: id (string)
Output:
  - create: Created ticket
  - findAll: List of tickets
  - findPending: List of pending tickets
  - hasPendingTicket: Boolean indicating if a pending ticket exists
  - findOne: Found ticket
  - approve: Approved ticket
  - reject: Rejected ticket
  - update: Updated ticket
  - remove: Deleted ticket
Return value: Ticket controller with endpoints to create, retrieve, update, delete, approve, reject, and check pending tickets
Function: Handles CRUD operations, approval, rejection, and status checks for tickets, with admin authentication protection and change logging
Variables: ticketService, loggerService
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul

Endpoints:
- POST /ticket
  Description: Creates a new ticket
  Permission: Public
  Input: createTicketDto
  Output: Created ticket

- GET /ticket
  Description: Retrieves all tickets
  Permission: Public
  Output: List of tickets

- GET /ticket/pending
  Description: Retrieves all pending tickets
  Permission: Public
  Output: List of pending tickets

- GET /ticket/hasPending/:itemId/:itemType
  Description: Checks if a pending ticket exists for a given item
  Permission: Public
  Output: Boolean indicating if a pending ticket exists

- GET /ticket/:id
  Description: Retrieves a ticket by id
  Permission: Public
  Output: Found ticket

- POST /ticket/approve/:id
  Description: Approves a ticket by id
  Permission: ADMIN (authentication required)
  Output: Approved ticket

- POST /ticket/reject/:id
  Description: Rejects a ticket by id
  Permission: ADMIN (authentication required)
  Output: Rejected ticket

- PATCH /ticket/:id
  Description: Updates a ticket by id
  Permission: ADMIN (authentication required)
  Input: updateTicketDto
  Output: Updated ticket

- DELETE /ticket/:id
  Description: Deletes a ticket by id
  Permission: ADMIN (authentication required)
  Output: Deleted ticket
*/
@Controller('ticket')
@ApiTags('Ticket')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly loggerService: LoggerService
  ) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Get('pending')
  findPending() {
    return this.ticketService.findPending();
  }

  @Get('hasPending/:itemId/:itemType')
  async hasPendingTicket(
    @Param('itemId') itemId: string,
    @Param('itemType') itemType: string
  ) {
    if (!Object.values(ItemType).includes(itemType as ItemType)) {
      throw new BadRequestException(`Invalid itemType: ${itemType}`);
    }

    const itemTypeMapping: { [key in ItemType]: TicketType } = {
      [ItemType.EXERCISE]: TicketType.EXERCISE,
      [ItemType.NOTE]: TicketType.NOTE,
      [ItemType.NEWS]: TicketType.NEWS,
      [ItemType.UTILS]: TicketType.UTILS,
      [ItemType.USER]: TicketType.USER
    };

    const hasPending = await this.ticketService.hasPendingTicket(
      itemId,
      itemTypeMapping[itemType as ItemType]
    );

    return { hasPendingTicket: hasPending };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @ApiBearerAuth()
  @Auth(RoleEnum.ADMIN)
  @Post('approve/:id')
  approve(@Param('id') id: string, @Req() req: any) {
    this.loggerService.logChange('ticket', 'approve', req.user.name, id);
    return this.ticketService.approve(id);
  }

  @ApiBearerAuth()
  @Auth(RoleEnum.ADMIN)
  @Post('reject/:id')
  reject(@Param('id') id: string, @Req() req: any) {
    this.loggerService.logChange('ticket', 'reject', req.user.name, id);
    return this.ticketService.reject(id);
  }

  @ApiBearerAuth()
  @Auth(RoleEnum.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @ApiBearerAuth()
  @Auth(RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(id);
  }
}
