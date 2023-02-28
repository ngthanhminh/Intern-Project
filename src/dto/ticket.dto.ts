import { ProjectDto } from './project.dto';
import { MemberDto } from './member.dto';
import { Exclude } from 'class-transformer';
import { 
     IsDate, 
     IsDateString, 
     IsNotEmpty, 
     IsNumber, 
     IsNumberString, 
     IsOptional, 
     IsString, 
     MaxLength, 
} from 'class-validator';

export class TicketDto {
  @IsOptional()
  @Exclude()
  id ?: number;

  @IsNotEmpty() 
  @IsOptional()
  code: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty() 
  @MaxLength(5000)
  @IsOptional()
  content: string;

  @IsDateString()
  @IsOptional()
  deadline: Date;  

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;

  @IsDateString()
  deleted_at: Date;

  @IsNumberString()
  @IsNotEmpty()
  project_id: number;

  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  project_member_id: number;
}
