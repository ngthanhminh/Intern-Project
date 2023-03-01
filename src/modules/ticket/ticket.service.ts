import { ProjectMemberRepository } from './../../repositories/projectMember.repository';
import { TicketRepository } from './../../repositories/ticket.repository';
import { ProjectMember } from '../../entities/projectMember.entity';
import { TicketDto } from './../../dto/ticket.dto';
import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Ticket } from 'src/entities/ticket.entity';

@Injectable()
export class TicketService {
     constructor(
          private readonly ticketRepository: TicketRepository,
          private readonly projectMembersRepository: ProjectMemberRepository,
     ) {} 
     

     // get list tickets in a project 
     async getTicketsInProject(projectId: number, deadline ?: string): Promise<Partial<Ticket>[]> {
          if(deadline !== undefined) {
               return await this.ticketRepository.find({
                    select: ['id', 'code', 'title', 'deadline', 'project_id', 'project_member_id', 'created_at', 'updated_at', 'deleted_at'],
                    where: {deadline: new Date(deadline), project_id: projectId}
               });
          } else {
               return await this.ticketRepository.find({
                    select: ['id', 'code', 'title', 'deadline', 'project_id', 'project_member_id', 'created_at', 'updated_at', 'deleted_at'],
                    where: [
                         {project_id: projectId},
                    ]
               });
          }

     }

     // get list tickets for a member 
     async getTicketsOfMember(id: number): Promise<Partial<Ticket>[]> {
          return await this.ticketRepository
          .createQueryBuilder('ticket')
          .select(['ticket.id', 
                    'ticket.code', 
                    'ticket.title', 
                    'ticket.deadline', 
                    'ticket.project_id', 
                    'ticket.project_member_id', 
                    'ticket.created_at', 
                    'ticket.updated_at', 
                    'ticket.deleted_at',
               ])
          .innerJoinAndSelect('ProjectMember', 'ProjectMember', "ProjectMember.id = ticket.project_member_id" )
          .where("ProjectMember.member_id = :member_id", {member_id: id})
          .getMany()
     }

     // create ticket
     async createTicket(ticket: Ticket): Promise<Ticket>{ 
          try {
               if(ticket.project_member_id === undefined) {
                    return await this.ticketRepository.save(ticket);
               }
               else {
                    const project = await this.projectMembersRepository
                         .createQueryBuilder('ProjectMember')
                         .where('ProjectMember.id = :id', {id: ticket.project_member_id})
                         .andWhere('ProjectMember.project_id = :project_id', {project_id: ticket.project_id})
                         .getOne()
                    if(project)
                         return this.ticketRepository.save(ticket);
                    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
               };
          }
          catch(error){
               console.log(error);
               throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
          };
     }

     // update ticket
     async updateTicket(id: number, ticket: Partial<TicketDto>): Promise<Ticket>{
          try {
               if(ticket.project_id === undefined && ticket.project_member_id === undefined) {
                    await this.ticketRepository.update(id, ticket);
                    return await this.ticketRepository.findOne({id: id});
               } else {
                    const project = await this.ticketRepository
                         .createQueryBuilder('ticket')
                         .innerJoinAndSelect('ProjectMember', 'ProjectMember', 'ticket.project_member = ProjectMember.id')
                         .where('ProjectMember.id = :id', {id: ticket.project_member_id})
                         .where('ProjectMember.project_id = :project_id', {project_id: ticket.project_id})
                         .getOne()
                    if(project){
                         await this.ticketRepository.update(id, ticket);
                         return await this.ticketRepository.findOne({id: id});
                    }
                    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
               }
          }
          catch(error) {
               console.log(error);
               throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
          }
     }

     // assign ticket for member 
     async assignTicketsFor(memberId: number, projectMembers, ticketIds: number[]): Promise<void> {
          for(let projectMember of projectMembers) {
               await this.ticketRepository
               .createQueryBuilder()
               .update('tickets')
               .set({project_member_id: projectMember.id})
               .where('tickets.project_id = :id', {id: projectMember.project_id})
               .andWhere('tickets.id IN (:...ids)', {ids: ticketIds})
               .execute()
          }
     }
}
