import { TicketService } from './../ticket/ticket.service';
import { ProjectMemberService } from '../projectMember/projectMember.service';
import { MemberRepository } from './../../repositories/member.repository';
import { MemberDto } from './../../dto/member.dto';
import { HttpException, HttpStatus, Injectable, } from '@nestjs/common';
import { Member } from 'src/entities/member.entity';
import { ProjectMember } from 'src/entities/projectMember.entity';

@Injectable()
export class MemberService {
     constructor(
          private readonly memberRepository: MemberRepository,
          private readonly ticketService: TicketService,
          private readonly projectMemberService: ProjectMemberService,
     ) {} 

     // get list members, find member with name & username 
     async getListMembers(username ?: string, name ?: string): Promise<Partial<Member>[]> {
          try {
               if(name !== undefined || username !== undefined) 
                    return await this.memberRepository.find({
                         select: 
                              ['id', 'name', 'username', 'avatar', 'created_at', 'updated_at', 'deleted_at'],
                         where: [
                              {name: name},
                              {username: username},
                         ],
                    })
               return await this.memberRepository.find({
                    select:
                         ['id', 'name', 'username', 'avatar', 'created_at', 'updated_at', 'deleted_at']
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
               const newMember = await this.memberRepository.save(memberData);
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
               const member = await this.memberRepository.findOne({id: id});
               if(member && !await MemberDto.comparePassword(memberData.password, member.password)) {
                    memberData.password = await MemberDto.encryptPassword(memberData.password);
                    await this.memberRepository.update(id, memberData);
                    const member2 = await this.memberRepository.findOne({id: id});
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
     async assignTicketForMember(memberId: number, ticketIds: number[]): Promise<ProjectMember[]> {
          if(this.projectMemberService.inProject(memberId)){
               const projectMembers = await this.projectMemberService.getProjectsOfMember(memberId);
               this.ticketService.assignTicketsFor(memberId, projectMembers, ticketIds);
               return await this.projectMemberService.getTicketsOf(memberId);
          }
          throw new HttpException('The member has not joined any projects', HttpStatus.BAD_REQUEST);
     }
}
