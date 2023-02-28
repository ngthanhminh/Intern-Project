import { TicketService } from './../ticket/ticket.service';
import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entity';
import { TicketModule } from '../ticket/ticket.module';
import { ProjectMember } from 'src/entities/projectMember.entity';
import { Ticket } from 'src/entities/ticket.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Member]),
      TypeOrmModule.forFeature([ProjectMember]),
      TypeOrmModule.forFeature([Ticket]),
  ],
  providers: [MemberService,],
  controllers: [MemberController]
})
export class MemberModule {}
