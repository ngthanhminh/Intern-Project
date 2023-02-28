import { MemberDto } from './../../dto/member.dto';
import { 
     HttpException, 
     HttpStatus, 
     Injectable, 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from 'src/entities/member.entity';
import { TicketService } from '../ticket/ticket.service';
import { Ticket } from 'src/entities/ticket.entity';
import { ProjectMember } from 'src/entities/projectMember.entity';

@Injectable()
export class MemberService {
     constructor(
          @InjectRepository(Member)
          private membersRepository: Repository<Member>,
          @InjectRepository(Ticket)
          private ticketsRepository: Repository<Ticket>,
          @InjectRepository(ProjectMember)
          private project_membersRepository: Repository<ProjectMember>,
     ) {} 

     // get list members, find member with name & username 
     async getListMembers(username ?: string, name ?: string): Promise<Partial<Member>[]> {
          try {
               if(name !== undefined || username !== undefined) 
                    return await this.membersRepository.find({
                         select: 
                              ['id', 'name', 'username', 'avatar', 'createdAt', 'updatedAt', 'deletedAt'],
                         where: [
                              {name: name},
                              {username: username},
                         ],
                    })
               return await this.membersRepository.find({
                    select:
                         ['id', 'name', 'username', 'avatar', 'createdAt', 'updatedAt', 'deletedAt']
               });             
          }
          catch(error) {
               console.log(error);
               throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
          }
     }

     //  create member
     async createMember(memberData: Member): Promise<Partial<Member>> {
          try {
               memberData.password = await MemberDto.encryptPassword(memberData.password);
               const newMember = await this.membersRepository.save(memberData);
               newMember.password = undefined;
               return newMember;
          }
          catch(error){
               console.log(error);
               throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
          };
     }

     // update member 
     async updateMember(id : number, memberData: Partial<MemberDto>): Promise<Partial<Member>> {
          try {
               const member = await this.membersRepository.findOne({id: id});
               console.log(member.password);
               
               if(member && !await MemberDto.comparePassword(memberData.password, member.password)) {
                    memberData.password = await MemberDto.encryptPassword(memberData.password);
                    await this.membersRepository.update(id, memberData);
                    const member2 = await this.membersRepository.findOne({id: id});
                    member2.password = undefined;
                    return member2;
               }
               throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          }
          catch(error) {
               console.log(error);
               throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
          }
     }
     
     // assign ticket for a member 
     async assignTicketForMember(memberId: number, ticketIds: number[]): Promise<Member | any> {
          const member = await this.project_membersRepository.findOne({member_id: memberId});
          if(member){
               const tickets: Ticket[] = await this.ticketsRepository
               .createQueryBuilder('ticket')
               .where('ticket.id IN (:...ids)', {ids: ticketIds})
               .getMany()  
               
               for(let ticket of tickets) {
                    ticket.project_member_id = member.id;
               }

               await this.ticketsRepository.save(tickets);
               return await this.project_membersRepository.find({
                    relations: ['tickets'],
                    where: {member_id: memberId},
               })
          }
          throw new HttpException('The member has not joined any projects', HttpStatus.BAD_REQUEST);
     }
}
