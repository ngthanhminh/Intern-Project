import { Exclude, } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { 
  IsNotEmpty, 
  IsString, 
  Matches,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateMemberDto } from './updateMember.dto';

export class CreateMemberDto {
      @IsNumberString()
      @IsOptional()
      @Exclude()
      id?: number; 

      @IsNotEmpty()
      @Matches(/^[a-zA-Z0-9_\s]{3,30}$/)
      name: string;

      @IsNotEmpty()
      @Matches(/^[a-z0-9_-]{3,30}$/)
      username: string;

      @IsNotEmpty()
      @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g)
      password: string;

      @IsString()
      @IsOptional()
      avatar?: string;

}
