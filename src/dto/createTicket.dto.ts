import { TicketStatus } from './../enum/ticketStatus.enum';
import { Exclude } from 'class-transformer';
import { 
     IsDate, 
     IsDateString, 
     IsEnum, 
     IsNotEmpty, 
     IsNumber, 
     IsNumberString, 
     IsOptional, 
     IsString, 
     MaxLength, 
} from 'class-validator';

export class CreateTicketDto {
  @IsOptional()
  @Exclude()
  id ?: number;

  @IsNumberString()
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

  @IsDateString()
  @IsOptional()
  deadline: Date; 

  @IsNumberString()
  @IsNotEmpty()
  project_id: number;

  @IsNumberString()
  @IsOptional()
  project_member_id: number;

  @IsNotEmpty()
  @IsEnum(TicketStatus)
  status: string;
}
