import { ParseIntPipe } from '@nestjs/common/pipes';
import { CreateUserTable1644433555076 } from './../../../migrations/1644433555076-CreateUserTable';
import { Ticket } from 'src/entities/ticket.entity';
import { TicketDto } from './../../dto/ticket.dto';
import { 
     Controller,
     Get,
     Post,
     Put,
     Delete,
     Param,
     Query,
     Body,
     Patch,
} from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
     constructor(private readonly ticketService: TicketService){}

     @Get('/project/:id')
     getTicketsInProject(
          @Param('id', ParseIntPipe) project_id: number,
          @Query('deadline') deadline ?: string,
     ): Promise<Partial<Ticket>[]> {
          return this.ticketService.getTicketsInProject(project_id, deadline);
     }

     @Get('/member/:id')
     getTicketsOfMember(
          @Param('id', ParseIntPipe) id ?: number,
     ): Promise<Partial<Ticket>[]> {
          return this.ticketService.getTicketsOfMember(id);
     }

     @Post() 
     createTicket(
          @Body() ticket: Ticket,
     ): Promise<Ticket> {
          return this.ticketService.createTicket(ticket);
     }

     @Patch(':id') 
     updateTicket(
          @Param('id', ParseIntPipe) id: number,
          @Body() ticket: TicketDto,
     ): Promise<Ticket> {
           return this.ticketService.updateTicket(id, ticket);
     }
}
