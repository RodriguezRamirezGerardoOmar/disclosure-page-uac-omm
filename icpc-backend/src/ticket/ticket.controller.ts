import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TicketType } from './entities/ticket.entity';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';

enum ItemType {
  EXERCISE = 'Ejercicios',
  NOTE = 'Apuntes',
  NEWS = 'Noticias',
  UTILS = 'Utilidades',
  USER = 'Usuarios'
}

@Controller('ticket')
@ApiTags('Ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

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
  approve(@Param('id') id: string) {
    return this.ticketService.approve(id);
  }

  @ApiBearerAuth()
  @Auth(RoleEnum.ADMIN)
  @Post('reject/:id')
  reject(@Param('id') id: string) {
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
