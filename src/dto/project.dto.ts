import { 
     IsDate, 
     IsDateString, 
     IsEnum, 
     IsNotEmpty, 
     IsNumberString, 
     IsOptional, 
     IsString 
} from 'class-validator';
import { ProjectType } from '../enum/projectType.enum';
import { Exclude, } from 'class-transformer';
import { TicketDto } from './ticket.dto';
import { Project } from 'src/entities/project.entity';

export class ProjectDto {
  @IsOptional()
  @Exclude()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsDateString()
  @IsOptional()
  start_date: Date;  

  @IsDateString()
  @IsOptional()
  end_date?: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(ProjectType)
  project_type: ProjectType;

  @IsNumberString()
  @IsOptional()
  expected_profit: bigint;

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;

  @IsDateString()
  deleted_at: Date;

}