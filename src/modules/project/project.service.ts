import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDto } from 'src/dto/project.dto';
import { Project } from 'src/entities/project.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProjectService {
     constructor(
          @InjectRepository(Project)
          private projectsRepository: Repository<Project>,
     ) {} 

     // get project
     async getProject(name ?: string, type ?: string, startDate ?: string, endDate ?: string): Promise<Project[]> {
          try {
               if (name !== undefined || type !== undefined || startDate !== undefined || endDate !== undefined){
                    return await this.projectsRepository.find({
                         where: [
                              {name: name}, 
                              {project_type: type},
                              {start_date: new Date(startDate)},
                              {end_date: new Date(endDate)},
                         ]
                    })
               }
              return await this.projectsRepository.find();
          }
          catch(error) {
               console.log(error);
               throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
          }
     }
          

     // create project 
     async createProject(project: Partial<Project>): Promise<Project>{
          try {
               return await this.projectsRepository.save(ProjectDto.toEntity(project));
          }
          catch(error){
               console.log(error);
               throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
          };
     }

     // update project 
     async updateProject(id: number, project: Partial<Project>): Promise<Project>{
          console.log('hhi')
          try {
               await this.projectsRepository.update(id, ProjectDto.toEntity(project));
               return await this.projectsRepository.findOne({id: id});
          }
          catch(error) {
               console.log(error);
               throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
          }
     }


}
