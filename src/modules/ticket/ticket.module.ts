import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/entities/ticket.entity';
import { ProjectMember } from 'src/entities/projectMember.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]),
            TypeOrmModule.forFeature([ProjectMember])
  ],
  providers: [TicketService],
  controllers: [TicketController],
  exports: [TicketService, ]
})
export class TicketModule {}
