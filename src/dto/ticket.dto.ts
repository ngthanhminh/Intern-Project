import { ProjectDto } from './project.dto';
import { MemberDto } from './member.dto';
import { Exclude } from 'class-transformer';
import { 
     IsDate, 
     IsNotEmpty, 
     IsOptional, 
     IsString, 
     MaxLength, 
} from 'class-validator';

export class TicketDto {
  @IsOptional()
  @Exclude()
  id ?: number;

  @IsNotEmpty() 
  code: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  content: string;

  @IsDate()
  @IsNotEmpty()
  deadline: Date;  

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsDate()
  deletedAt: Date;

  project: ProjectDto;

  assign: MemberDto;

}
