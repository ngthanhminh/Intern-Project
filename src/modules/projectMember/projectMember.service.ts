import { Injectable } from '@nestjs/common';
import { CreateProjectMemberDto } from 'src/dto/createProjectMember.dto';
import { ProjectMember } from '../../entities/projectMember.entity';
import { ProjectMemberRepository } from '../../repositories/projectMember.repository';

@Injectable()
export class ProjectMemberService {
     constructor(private readonly projectMemberRepository: ProjectMemberRepository) {}

     // get project member 
     async getProjectMember(): Promise<ProjectMember[]> {
          return await this.projectMemberRepository.find();
     }

     // create project member
     async createProjectMember(projectMember: CreateProjectMemberDto): Promise<ProjectMember> {
          return await this.projectMemberRepository.save(projectMember);
     }

     // update project member
     async updateProjectMember(id: number, projectMember: Partial<CreateProjectMemberDto>): Promise<ProjectMember> {
          await this.projectMemberRepository.update(id, projectMember);
          return this.projectMemberRepository.findOne({id: id});
     }

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
     async existProjectMember(memberId: number, projectId?: number) {
          const find = {};
          if(memberId) find['member_id'] = memberId;
          if(projectId) find['project_id'] = projectId;
          const projectMember = await this.projectMemberRepository.find({where: find});
          if(projectMember.length > 0) 
               return true;
          return false;
     }
}
