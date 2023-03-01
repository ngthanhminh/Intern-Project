import { ProjectRepository } from './../../repositories/project.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDto } from 'src/dto/project.dto';
import { Project } from 'src/entities/project.entity';
import { Ticket } from 'src/entities/ticket.entity';

@Injectable()
export class ProjectService {
     constructor(private readonly projectRepository: ProjectRepository) {} 

     // get project
     async getProject(page ?: string, limit ?: string, name ?: string, type ?: string, startDate ?: string, endDate ?: string): Promise<Project[]> {          
          try {
               let proj: Project[] = [];
               if (name !== undefined || type !== undefined || startDate !== undefined || endDate !== undefined) {
                    proj = await this.projectRepository.find({
                         relations: ['tickets'],
                         where: [
                              {name: name}, 
                              {project_type: type},
                              {start_date: new Date(startDate)},
                              {end_date: new Date(endDate)},
                         ], 
                    })
               } else if(page !== undefined && limit !== undefined) {
                    if(Number.isNaN(Number(page)) || Number.isNaN(Number(limit))) {
                         throw new HttpException('Page & limit is not NaN', HttpStatus.BAD_REQUEST)
                    }
                    proj = await this.projectRepository.find({
                         relations: ['tickets'],
                         skip: (Number(page)-1) * Number(limit),
                         take: Number(limit),
                    });
               } else {
                    proj = await this.projectRepository.find({
                         relations: ['tickets'],
                    });
               }

               proj.forEach((val, ind) => {
                    let ticketTodo: Ticket[] = [];
                    for(let ticket of val.tickets){
                         if(ticket.status === 'TODO')
                              ticketTodo.push(ticket);
                    }
                    val.tickets = ticketTodo;
               })

               return proj;
          }
          catch(error) {
               console.log(error);
               throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
          }
     }
          

     // create project 
     async createProject(project: Project): Promise<Project>{
          try {
               return await this.projectRepository.save(project);
          }
          catch(error){
               console.log(error);
               throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
          };
     }

     // update project 
     async updateProject(id: number, project: Partial<ProjectDto>): Promise<Project>{
          try {
               await this.projectRepository.update(id, project);
               return await this.projectRepository.findOne({id: id});
          }
          catch(error) {
               console.log(error);
               throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
          }
     }
     
}
