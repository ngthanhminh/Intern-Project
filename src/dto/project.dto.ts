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
  name: string;

  @IsDateString()
  @IsOptional()
  start_date ?: Date;  

  @IsDateString()
  @IsOptional()
  end_date ?: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(ProjectType)
  project_type ?: ProjectType;

  @IsNumberString()
  @IsOptional()
  expected_profit ?: bigint;

  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @IsDateString()
  @IsOptional()
  updatedAt: Date;

  @IsDateString()
  @IsOptional()
  deletedAt: Date;

  public static toEntity(dto: Partial<ProjectDto>): Project {
    const it = new Project();
    if (dto.hasOwnProperty('name')) {
      it.name = dto.name;
    }
    if (dto.hasOwnProperty('start_date')) {
      it.start_date = new Date(dto.start_date);
    }
    if (dto.hasOwnProperty('end_date')) {
      it.end_date = new Date(dto.end_date);
    }
    if (dto.hasOwnProperty('project_type')) {
      it.project_type = dto.project_type;
    }
    if (dto.hasOwnProperty('expected_profit')) {
      it.expected_profit = dto.expected_profit;
    }
    if (dto.hasOwnProperty('createAt')) {
      it.createdAt = new Date(dto.createdAt);
    }
    if (dto.hasOwnProperty('updatedAt')) {
      it.updatedAt = new Date(dto.updatedAt);
    }
    if (dto.hasOwnProperty('deletedAt')) {
      it.deletedAt = new Date(dto.deletedAt);
    }
    return it;
}
}
