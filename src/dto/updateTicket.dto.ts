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
import { CreateTicketDto } from './createTicket.dto';

export class UpdateTicketDto extends CreateTicketDto {

  @IsOptional()
  code: number;

  @IsOptional()
  title: string;

  @IsOptional()
  content: string;

  @IsNumberString()
  @IsOptional()
  project_id: number; 

  @IsOptional()
  status: string;
}
