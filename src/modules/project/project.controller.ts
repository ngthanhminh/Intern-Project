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
import { EMPTY } from 'rxjs';
import { UpdateProjectDto } from 'src/dto/updateProject.dto';
import { CreateProjectDto } from 'src/dto/createProject.dto';

@UsePipes(ValidationPipe)
@Controller('project')
export class ProjectController {
     constructor(private readonly projectService: ProjectService){}

     @Get()
     async getProject(
          @Query('page') page ?: string,
          @Query('limit') limit ?: string,
          @Query('name') name ?: string,
          @Query('type') type ?: string,
          @Query('startDate') startDate ?: string,
          @Query('endDate') endDate ?: string,
     ): Promise<Project[]> {
          return await this.projectService.getProject(page, limit, name, type, startDate, endDate);
     }

     @Post()
     async createProject(
          @Body() project: CreateProjectDto,
     ): Promise<Project> {
          return await this.projectService.createProject(project) ; 
     }

     @Patch(':id')
     async updateProject(
          @Param('id', ParseIntPipe) id: number,
          @Body() project: UpdateProjectDto,
     ): Promise<Project> {
          return await this.projectService.updateProject(id, project);
     }
}
