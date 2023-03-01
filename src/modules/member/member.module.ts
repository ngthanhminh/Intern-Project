import { TicketRepository } from './../../repositories/ticket.repository';
import { ProjectMemberRepository } from './../../repositories/projectMember.repository';
import { TicketService } from './../ticket/ticket.service';
import { TicketModule } from './../ticket/ticket.module';
import { MemberRepository } from './../../repositories/member.repository';
import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectMemberModule } from '../projectMember/projectMember.module';
import { ProjectMemberService } from '../projectMember/projectMember.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([MemberRepository]),
      ProjectMemberModule,
      TicketModule,
  ],
  providers: [MemberService],
  controllers: [MemberController],
  exports: [MemberService,]
})
export class MemberModule {}
