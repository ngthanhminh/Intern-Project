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

    public static async encryptPassword(password: string): Promise<string> {
        try {
          const secret = 'mysecret';
          return createHmac('md5', secret).update('mystring').digest('hex');
        }
        catch(error) {
          if(error) {
            console.log(error);
            throw new HttpException("Can't encrypt password", HttpStatus.BAD_REQUEST);
          }
        }
    }

    public static async comparePassword(password: string, hash: string) {
      try {
        // return crypto.verify(hash, password, 'mysecret');
        return true;

      }
      catch(error) {
        if(error) {
          console.log(error);
          throw new HttpException("Can't compare password", HttpStatus.BAD_REQUEST);
        }
      }
    }
}
