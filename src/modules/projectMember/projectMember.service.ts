import { Injectable } from '@nestjs/common';
import { ProjectMember } from 'src/entities/projectMember.entity';
import { ProjectMemberRepository } from 'src/repositories/projectMember.repository';

@Injectable()
export class ProjectMemberService {
     constructor(private readonly projectMemberRepository: ProjectMemberRepository) {}

     // get all project member joined 
     async getProjectsOfMember(memberId: number): Promise<ProjectMember[]> {
          return await this.projectMemberRepository
               .createQueryBuilder('ProjectMember')
               .where('ProjectMember.member_id = :id', {id: memberId})
               .getMany()  
     }

     // get tickets of member 
     async getTicketsOf(memberId: number): Promise<ProjectMember[]> {
          return await this.projectMemberRepository.find({
               relations: ['tickets'],
               where: {member_id: memberId},
          })
     }

     // check member in a project 
     async inProject(memberId: number) {
          await this.projectMemberRepository.findOne({member_id: memberId}) && true;
     }
}
