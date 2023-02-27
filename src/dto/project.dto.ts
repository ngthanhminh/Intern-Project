import { 
     IsDate, 
     IsDateString, 
     IsEnum, 
     IsNotEmpty, 
     IsNumberString, 
     IsOptional, 
     IsString 
} from 'class-validator';
import { ProjectType } from './projectType.enum';
import { Exclude, } from 'class-transformer';
import { TicketDto } from './ticket.dto';
import { Project } from 'src/entities/project.entity';

export class ProjectDto {
  @IsOptional()
  @Exclude()
  id ?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsDateString()
  @IsOptional()
  start_date: Date;  

  @IsDateString()
  @IsOptional()
  end_date ?: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(ProjectType)
  project_type: ProjectType;

  @IsNumberString()
  @IsOptional()
  expected_profit: bigint;

  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @IsDateString()
  @IsOptional()
  updatedAt: Date;

  @IsDateString()
  @IsOptional()
  deletedAt: Date;

}