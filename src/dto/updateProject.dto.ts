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
import { CreateProjectDto } from './createProject.dto';

export class UpdateProjectDto extends CreateProjectDto {
  @IsOptional()
  name: string;

  @IsOptional()
  project_type: ProjectType;
}