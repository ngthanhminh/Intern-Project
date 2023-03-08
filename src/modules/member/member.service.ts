import { PasswordFeature } from './../../feature/pasword.feature';
import { TicketService } from './../ticket/ticket.service';
import { ProjectMemberService } from '../projectMember/projectMember.service';
import { MemberRepository } from './../../repositories/member.repository';
import { HttpException, HttpStatus, Injectable, } from '@nestjs/common';
import { Member } from 'src/entities/member.entity';
import { ProjectMember } from 'src/entities/projectMember.entity';
import { CreateMemberDto } from 'src/dto/createMember.dto';
import { UpdateMemberDto } from 'src/dto/updateMember.dto';

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
               const keySearch = {};
               if(name) keySearch['name'] = name;
               if(username) keySearch['username'] = username;
               return await this.memberRepository.find({
                    select: ['id', 'name', 'username', 'avatar', 'created_at', 'updated_at', 'deleted_at'],
                    where: keySearch,
               })    
          }
          catch(error) {
               console.log(error);
               throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
          }
     }

     //  create member
     async createMember(memberData: CreateMemberDto): Promise<Partial<Member>> {
          try {
               memberData.password = PasswordFeature.HashPassWord(memberData.password);
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
     async updateMember(id : number, memberData: UpdateMemberDto): Promise<Partial<Member>> {
          try {
               const member = await this.memberRepository.findOne({id: id});
               if(member && PasswordFeature.ComparePassword(memberData.password, member.password)) {
                    memberData.password = PasswordFeature.HashPassWord(memberData.password);
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
