import { ProjectType } from '../../dto/projectType.enum';
import { 
     Controller,
     Get,
     Post,
     Put,
     Delete,
     Param,
     Query,
     Body,
     UsePipes,
     Patch,
} from '@nestjs/common';
import { Project } from 'src/entities/project.entity';
import { ProjectService } from './project.service';
import { ParseEnumPipe, ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';

@UsePipes(ValidationPipe)
@Controller('project')
export class ProjectController {
     constructor(private readonly projectService: ProjectService){}

     @Get()
     async getProject(
          @Query('name') name ?: string,
          @Query('type') type ?: string,
          @Query('startDate') startDate ?: string,
          @Query('endDate') endDate ?: string,
     ): Promise<Project | Project[]> {
          return await this.projectService.getProject(name, type, startDate, endDate);
     }

     @Post()
     async createProject(
          @Body() project: Partial<Project>,
     ): Promise<Project> {
          return await this.projectService.createProject(project) ; 
     }

     @Patch(':id')
     async updateProject(
          @Param('id', ParseIntPipe) id: number,
          @Body() project: Partial<Project>,
     ): Promise<Project> {
          return await this.projectService.updateProject(id, project);
     }
}
