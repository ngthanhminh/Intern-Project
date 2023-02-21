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
      id ?: number; 

      @IsString()
      @IsNotEmpty()
      @IsOptional()
      @Matches(/^[a-zA-Z0-9_\s]{3,30}$/)
      name: string;

      @IsString()
      @IsNotEmpty()
      @Matches(/^[a-z0-9_-]{3,30}$/)
      username: string;

      @IsNotEmpty()
      @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g)
      password: string;

      @IsOptional()
      avatar ?: string;

      @IsDateString()
      @IsOptional()
      createdAt: Date;
      updatedAt: Date;
      deletedAt ?: Date;

  public static toEntity(dto: Partial<MemberDto>) {
      const it = new Member();
      if (dto.hasOwnProperty('name')) {
        it.name = dto.name;
      }
      if (dto.hasOwnProperty('username')) {
        it.username = dto.username;
      }
      if (dto.hasOwnProperty('password')) {
        it.password = dto.password;
      }
      if (dto.hasOwnProperty('avatar')) {
        it.avatar = dto.avatar;
      }
      if (dto.hasOwnProperty('createAt')) {
        it.createdAt = dto.createdAt;
      }
      if (dto.hasOwnProperty('updatedAt')) {
        it.updatedAt = dto.updatedAt;
      }
      if (dto.hasOwnProperty('deletedAt')) {
        it.deletedAt = dto.deletedAt;
      }
      return it;
  }

    public static async encryptPassword(password: string): Promise<string> {
        try {
          const saltOrRounds = 10;
          return await bcrypt.hash(password, saltOrRounds);
        }
        catch(error){
          if(error) {
            console.log(error);
            throw new HttpException("Can't encrypt password", HttpStatus.BAD_REQUEST);
          }
        }
    }

    public static async createEntity(dto: Partial<MemberDto>) {
        const it = new Member();
        if (dto.hasOwnProperty('name')) {
          it.name = dto.name;
        }
        if (dto.hasOwnProperty('username')) {
          it.username = dto.username;
        }
        if (dto.hasOwnProperty('password')) {
          it.password = await MemberDto.encryptPassword(dto.password);
        }
        if (dto.hasOwnProperty('avatar')) {
          it.avatar = dto.avatar;
        }
        if (dto.hasOwnProperty('createAt')) {
          it.createdAt = new Date(dto.createdAt);
        }
        if (dto.hasOwnProperty('updatedAt')) {
          it.updatedAt = new Date(dto.updatedAt);
        }
        if (dto.hasOwnProperty('deletedAt')) {
          it.deletedAt = new Date(dto.deletedAt);
        }
        return it;
    }

    public static async updateEntity(dto: Partial<MemberDto>) {
      const it = new MemberDto();
      if (dto.hasOwnProperty('name')) {
        it.name = dto.name;
      }
      if (dto.hasOwnProperty('password')) {
        it.password = await MemberDto.encryptPassword(dto.password);
      }
      if (dto.hasOwnProperty('avatar')) {
        it.avatar = dto.avatar;
      }
      if (dto.hasOwnProperty('createAt')) {
        it.createdAt = new Date(dto.createdAt);
      }
      if (dto.hasOwnProperty('updatedAt')) {
        it.updatedAt = new Date(dto.updatedAt);
      }
      if (dto.hasOwnProperty('deletedAt')) {
        it.deletedAt = new Date(dto.deletedAt);
      }
      return MemberDto.toEntity(it); 
      return it;
  }
}
