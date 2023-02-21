import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from 'src/entities/ticket.entity';

@Injectable()
export class TicketService {
     constructor(
          @InjectRepository(Ticket)
          private membersRepository: Repository<Ticket>,
     ) {} 
}
