import { TicketRepository } from './../../repositories/ticket.repository';
import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Ticket } from 'src/entities/ticket.entity';
import { UpdateTicketDto } from 'src/dto/updateTicket.dto';
import { CreateTicketDto } from 'src/dto/createTicket.dto';
import { ProjectMemberService } from '../projectMember/projectMember.service';

@Injectable()
export class TicketService {
     constructor(
          private readonly ticketRepository: TicketRepository,
          private readonly projectMemberService: ProjectMemberService,
     ) {} 
     

     // get list tickets in a project 
     async getTicketsInProject(projectId: number, deadline ?: string): Promise<Partial<Ticket>[]> {
          const keySearch = {project_id: projectId}
          if(deadline) keySearch['deadline'] = deadline;
               return await this.ticketRepository.find({
                    select: ['id', 'code', 'title', 'deadline', 'project_id', 'project_member_id', 'created_at', 'updated_at', 'deleted_at'],
                    where: keySearch,
               });
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
     async createTicket(ticket: CreateTicketDto | UpdateTicketDto): Promise<Ticket>{ 
          try {
               if(ticket.project_member_id === undefined) {
                    return await this.ticketRepository.save(ticket);
               }
               else {
                    const project = await this.projectMemberService.existProjectMember(ticket.project_member_id, ticket.project_id);
                    if(project)
                         return await this.ticketRepository.save(ticket);
                    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
               };
          }
          catch(error){
               console.log(error);
               throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
          };
     }

     // update ticket
     async updateTicket(id: number, ticket: UpdateTicketDto): Promise<Ticket> {
          try {
               const t = await this.ticketRepository.findOne({id: id});
               if(!t) throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);

               if(t.project_member_id === null) {
                    return await this.ticketRepository.save(ticket);
               }
               return await this.createTicket(Object.assign(t, ticket));
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
