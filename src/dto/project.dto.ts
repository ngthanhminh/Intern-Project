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

}