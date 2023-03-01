import { ProjectMember } from '../entities/projectMember.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ProjectMember)
export class ProjectMemberRepository extends Repository<ProjectMember> {}
