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
     async inProject(memberId: number) {
          return await this.projectMemberRepository.findOne({member_id: memberId});
     }

     // member take part in project 
     async existProjectMember(projectMemberId: number, projectId: number) {
          return await this.projectMemberRepository
               .createQueryBuilder('ProjectMember')
               .where('ProjectMember.id = :id', {id: projectMemberId})
               .andWhere('ProjectMember.project_id = :project_id', {project_id: projectId})
               .getOne()
     }

}
