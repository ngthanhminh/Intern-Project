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
     ) {} 
     

     // get list tickets in a project 
     async getTicketsInProject(project_id: number, deadline ?: string): Promise<Partial<Ticket>[]> {
          if(deadline !== undefined) {
               return await this.ticketsRepository.find({
                    select: ['id', 'code', 'title', 'deadline', 'project_id', 'project_member_id', 'createdAt', 'updatedAt', 'deletedAt'],
                    where: {deadline: new Date(deadline), project_id: project_id}
               });
          } else {
               return await this.ticketsRepository.find({
                    select: ['id', 'code', 'title', 'deadline', 'project_id', 'project_member_id', 'createdAt', 'updatedAt', 'deletedAt'],
                    where: [
                         {project_id: project_id},
                    ]
               });
          }

     }

     // get list tickets for a member 
     async getTicketsOfMember(id: number): Promise<Partial<Ticket>[]> {
          return await this.ticketsRepository
          .createQueryBuilder('ticketEntity')
          .select(['ticketEntity.id', 
                    'ticketEntity.code', 
                    'ticketEntity.title', 
                    'ticketEntity.deadline', 
                    'ticketEntity.project_id', 
                    'ticketEntity.project_member_id', 
                    'ticketEntity.createdAt', 
                    'ticketEntity.updatedAt', 
                    'ticketEntity.deletedAt'])
          .innerJoinAndSelect('Project_Member', 'Project_Member', "Project_Member.id = ticketEntity.project_member_id" )
          .where("Project_Member.member_id = :member_id", {member_id: id})
          .getMany()

          // return await this.ticketsRepository.find({
          //      select: ['id', 'code', 'title', 'deadline', 'project_id', 'project_member_id', 'createdAt', 'updatedAt', 'deletedAt'],
          //      relations: ['project_member'],
          //      where: {
          //           project_member: {member_id: id}
          //      }
          // })
     }

     // create ticket
     async createTicket(ticket: Ticket): Promise<Ticket>{ 
          try {
               return await this.ticketsRepository.save(ticket);
          }
          catch(error){
               console.log(error);
               throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
          };
     }

     // update ticket
     async updateTicket(id: number, ticket: TicketDto): Promise<Ticket>{
          try {
               await this.ticketsRepository.update(id, ticket);
               return await this.ticketsRepository.findOne({id: id});
          }
          catch(error) {
               console.log(error);
               throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
          }
     }
}
