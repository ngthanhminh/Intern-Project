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
  @IsOptional()
  createdAt: Date;

  @IsDateString()
  @IsOptional()
  updatedAt: Date;

  @IsDateString()
  @IsOptional()
  deletedAt: Date;

  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  // @Exclude()
  project_id: number;

  @IsNumberString()
  @IsOptional()
  assign: number;
}
