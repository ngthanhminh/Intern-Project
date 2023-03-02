import { ProjectMemberService } from './projectMember.service';
import { CreateProjectMemberDto } from '../../dto/createProjectMember.dto'
import { 
     Controller,
     Get, 
     Post,
     Patch,
     Body,
     Param,
     ParseIntPipe,
 } from '@nestjs/common';
import { ProjectMember } from 'src/entities/projectMember.entity';

@Controller('project-member')
export class ProjectMemberController {
     constructor(private readonly projectMemberService: ProjectMemberService) {}

     @Get()
     async getProjectMember(): Promise<ProjectMember[]> {
          return this.projectMemberService.getProjectMember();
     }

     @Post()
     async createProjectMember(
          @Body() projectMember: CreateProjectMemberDto,
     ): Promise<ProjectMember> {
          return this.projectMemberService.createProjectMember(projectMember);
     }

     @Patch(':id')
     async updateProjectMember(
          @Body() projectMember: Partial<CreateProjectMemberDto>,
          @Param('id', ParseIntPipe) id: number,
     ): Promise<ProjectMember> {
          return this.projectMemberService.updateProjectMember(id, projectMember);
     }
}
