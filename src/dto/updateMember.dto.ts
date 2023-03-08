import { Exclude, } from 'class-transformer';
import { 
  IsNotEmpty, 
  IsString, 
  Matches,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateMemberDto } from './createMember.dto';
import { createHmac } from 'crypto';

export class UpdateMemberDto extends CreateMemberDto {
      @IsOptional()
      name: string;

      @Exclude()
      username: string;

      @IsOptional()
      password: string;

}
