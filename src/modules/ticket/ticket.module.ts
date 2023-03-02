import { ProjectMemberModule } from './../projectMember/projectMember.module';
import { TicketRepository } from './../../repositories/ticket.repository';
import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TicketRepository]),
            ProjectMemberModule,
  ],
  providers: [TicketService],
  controllers: [TicketController],
  exports: [TicketService, ]
})
export class TicketModule {}
