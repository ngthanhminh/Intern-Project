import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { type } from 'os';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { Project } from './project.entity';
import { Project_Member } from './project_member.entity';

@Entity({
  name: 'tickets',
})
export class Ticket {
  @PrimaryGeneratedColumn()
  id ?: number;

  @IsNotEmpty()
  @Column({
    name: 'code',
    type: 'int',
    unique: true,
  })
  code: number;

  @IsNotEmpty()
  @Column({
    type: 'nvarchar',
    length: 120,
    name: 'title',
  })
  title: string;

  @IsNotEmpty()
  @Column({
    type: 'text',
    name: 'content',
  })
  content: string;

  @IsDateString()
  @IsNotEmpty()
  @CreateDateColumn({
    name: 'deadline',
  })
  deadline: Date;  

  @IsDateString()
  @IsOptional()
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @IsDateString()
  @IsOptional()
  @CreateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @IsDateString()
  @IsOptional()
  @CreateDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;

  @IsNotEmpty()
  @IsNumberString()
  @Column({
    name: 'project_id',
    type: 'int',
  })
  project_id: number;

  @IsOptional()
  @Column({
    name: 'project_member_id',
    type: 'int',
  })
  project_member_id: number;

  @ManyToOne(type => Project, (project) => project.tickets)
  @JoinColumn({
    name: 'project_id'
  })
  project: Project;

  @ManyToOne(type => Project_Member, (pm) => pm.ticket)
  @JoinColumn({
    name: 'project_member_id',
  })
  project_member: Project_Member;

}
