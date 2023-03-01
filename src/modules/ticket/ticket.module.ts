import { ProjectMemberRepository } from './../../repositories/projectMember.repository';
import { TicketRepository } from './../../repositories/ticket.repository';
import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TicketRepository]),
            TypeOrmModule.forFeature([ProjectMemberRepository])
  ],
  providers: [TicketService],
  controllers: [TicketController],
  exports: [TicketService, ]
})
export class TicketModule {}
