import { Ticket } from '../entities/ticket.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {}
