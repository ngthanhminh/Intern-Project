import { ProjectRepository } from './../../repositories/project.repository';
import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRepository])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
