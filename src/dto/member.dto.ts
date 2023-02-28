import { Member } from 'src/entities/member.entity';
import { Exclude, } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { 
  IsNotEmpty, 
  IsString, 
  MaxLength, 
  MinLength, 
  Matches,
  IsOptional,
  IsDateString,
  IsNumberString,
} from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

export class MemberDto {
      @IsNumberString()
      @IsOptional()
      @Exclude()
      id?: number; 

      @IsString()
      @IsNotEmpty()
      @IsOptional()
      @Matches(/^[a-zA-Z0-9_\s]{3,30}$/)
      name: string;

      @IsString()
      @Exclude()
      @IsNotEmpty()
      @IsOptional()
      @Matches(/^[a-z0-9_-]{3,30}$/)
      username: string;

      @IsNotEmpty()
      @IsOptional()
      @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g)
      password: string;

      @IsOptional()
      avatar?: string;

      @IsDateString()
      created_at: Date;

      @IsDateString()
      updated_at: Date;

      @IsDateString()
      deleted_at: Date;

    public static async encryptPassword(password: string): Promise<string> {
        try {
          const saltOrRounds = 10;
          return await bcrypt.hash(password, saltOrRounds);
        }
        catch(error) {
          if(error) {
            console.log(error);
            throw new HttpException("Can't encrypt password", HttpStatus.BAD_REQUEST);
          }
        }
    }

    public static async comparePassword(password: string, hash: string){
      try {
        return await bcrypt.compare(password, hash);
      }
      catch(error) {
        if(error) {
          console.log(error);
          throw new HttpException("Can't compare password", HttpStatus.BAD_REQUEST);
        }
      }
    }
}
