import { ProjectRepository } from './../../repositories/project.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { Ticket } from 'src/entities/ticket.entity';
import { UpdateProjectDto } from '../../dto/updateProject.dto';
import { CreateProjectDto } from 'src/dto/createProject.dto';

@Injectable()
export class ProjectService {
     constructor(private readonly projectRepository: ProjectRepository) {} 

     // get project
     async getProject(page ?: string, limit ?: string, name ?: string, type ?: string, startDate ?: string, endDate ?: string): Promise<Project[]> {          
          try {
               const keySearch = {};
               let projects = [];
               if (name !== undefined) {
                    keySearch['name'] = name;
               } 
               if(type !== undefined) {
                    keySearch['type'] = type;
               }
               if(startDate !== undefined) {
                    keySearch['startDate'] = startDate;
               }
               if(endDate !== undefined) {
                    keySearch['endDate'] = endDate;
               }

               if(page !== undefined && limit !== undefined) {
                    if(Number.isNaN(Number(page)) || Number.isNaN(Number(limit))) {
                         throw new HttpException('Page & limit is not number', HttpStatus.BAD_REQUEST)
                    }
                    projects = await this.projectRepository.find({
                         relations: ['tickets'],
                         where: keySearch,
                         skip: (Number(page)-1) * Number(limit),
                         take: Number(limit),
                    });
               } else {
                    projects = await this.projectRepository.find({
                         relations: ['tickets'],
                         where: keySearch,
                    });
               }

               projects.forEach((val, ind) => {
                    let ticketTodo: Ticket[] = [];
                    for(let ticket of val.tickets){
                         if(ticket.status === 'TODO')
                              ticketTodo.push(ticket);
                    }
                    val.tickets = ticketTodo;
               })

               return projects;
          }
          catch(error) {
               console.log(error);
               throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
          }
     }
          

     // create project 
     async createProject(project: CreateProjectDto): Promise<Project>{
          try {
               return await this.projectRepository.save(project);
          }
          catch(error){
               console.log(error);
               throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
          };
     }

     // update project 
     async updateProject(id: number, project: UpdateProjectDto): Promise<Project>{
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
