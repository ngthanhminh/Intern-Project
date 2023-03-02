import { ParseArrayPipe, ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { Ticket } from 'src/entities/ticket.entity';
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
     UsePipes,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { UpdateTicketDto } from 'src/dto/updateTicket.dto';
import { CreateTicketDto } from 'src/dto/createTicket.dto';

@UsePipes(ValidationPipe)
@Controller('ticket')
export class TicketController {
     constructor(private readonly ticketService: TicketService){}

     @Get('/project/:id')
     getTicketsInProject(
          @Param('id', ParseIntPipe) projectId: number,
          @Query('deadline') deadline ?: string,
     ): Promise<Partial<Ticket>[]> {
          return this.ticketService.getTicketsInProject(projectId, deadline);
     }

     @Get('/member/:id')
     getTicketsOfMember(
          @Param('id', ParseIntPipe) id ?: number,
     ): Promise<Partial<Ticket>[]> {
          return this.ticketService.getTicketsOfMember(id);
     }

     @Post() 
     createTicket(
          @Body() ticket: CreateTicketDto,
     ): Promise<Ticket> {
          return this.ticketService.createTicket(ticket);
     }

     @Patch(':id') 
     updateTicket(
          @Param('id', ParseIntPipe) id: number,
          @Body() ticket: UpdateTicketDto,
     ): Promise<Ticket> {
           return this.ticketService.updateTicket(id, ticket);
     }

}
