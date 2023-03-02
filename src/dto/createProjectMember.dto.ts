import { Exclude } from 'class-transformer';
import { IsDateString, IsNumber, IsNumberString, IsOptional } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

export class CreateProjectMemberDto {
  @IsOptional()
  @Exclude()
  id?: number;

  @IsNumberString()
  member_id: number;

  @IsNumberString()
  project_id: number;

}
