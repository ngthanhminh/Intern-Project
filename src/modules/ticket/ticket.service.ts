import { ProjectMember } from '../../entities/projectMember.entity';
import { TicketDto } from './../../dto/ticket.dto';
import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from 'src/entities/ticket.entity';

@Injectable()
export class TicketService {
     constructor(
          @InjectRepository(Ticket)
          private ticketsRepository: Repository<Ticket>,
          @InjectRepository(ProjectMember)
          private project_membersRepository: Repository<ProjectMember>,
     ) {} 
     

     // get list tickets in a project 
     async getTicketsInProject(projectId: number, deadline ?: string): Promise<Partial<Ticket>[]> {
          if(deadline !== undefined) {
               return await this.ticketsRepository.find({
                    select: ['id', 'code', 'title', 'deadline', 'project_id', 'project_member_id', 'created_at', 'updated_at', 'deleted_at'],
                    where: {deadline: new Date(deadline), project_id: projectId}
               });
          } else {
               return await this.ticketsRepository.find({
                    select: ['id', 'code', 'title', 'deadline', 'project_id', 'project_member_id', 'created_at', 'updated_at', 'deleted_at'],
                    where: [
                         {project_id: projectId},
                    ]
               });
          }

     }

     // get list tickets for a member 
     async getTicketsOfMember(id: number): Promise<Partial<Ticket>[]> {
          return await this.ticketsRepository
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
                    return await this.ticketsRepository.save(ticket);
               }
               else {
                    const project = await this.project_membersRepository
                         .createQueryBuilder('ProjectMember')
                         .where('ProjectMember.id = :id', {id: ticket.project_member_id})
                         .andWhere('ProjectMember.project_id = :project_id', {project_id: ticket.project_id})
                         .getOne()
                    if(project)
                         return this.ticketsRepository.save(ticket);
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
                    await this.ticketsRepository.update(id, ticket);
                    return await this.ticketsRepository.findOne({id: id});
               } else {
                    const project = await this.ticketsRepository
                         .createQueryBuilder('ticket')
                         .innerJoinAndSelect('ProjectMember', 'ProjectMember', 'ticket.project_member = ProjectMember.id')
                         .where('ProjectMember.id = :id', {id: ticket.project_member_id})
                         .where('ProjectMember.project_id = :project_id', {project_id: ticket.project_id})
                         .getOne()
                    if(project){
                         await this.ticketsRepository.update(id, ticket);
                         return await this.ticketsRepository.findOne({id: id});
                    }
                    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
               }
          }
          catch(error) {
               console.log(error);
               throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
          }
     }
}
