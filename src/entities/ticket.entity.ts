import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { type } from 'os';
import { TicketStatus } from '../enum/ticketStatus.enum';
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
import { ProjectMember } from './projectMember.entity';

@Entity({
  name: 'tickets',
})
export class Ticket {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    name: 'code',
    type: 'int',
    unique: true,
  })
  code: number;

  @Column({
    type: 'nvarchar',
    length: 120,
    name: 'title',
  })
  title: string;

  @Column({
    type: 'text',
    name: 'content',
  })
  content: string;

  @CreateDateColumn({
    name: 'deadline',
  })
  deadline: Date;  

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;

  @CreateDateColumn({
    name: 'updated_at',
  })
  updated_at: Date;

  @CreateDateColumn({
    name: 'deleted_at',
  })
  deleted_at: Date;

  @Column({
    type: 'varchar',
    name: 'status',
  })
  status: string;

  @Column({
    name: 'project_id',
    type: 'int',
  })
  project_id: number;

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

  @ManyToOne(type => ProjectMember, (pm) => pm.tickets)
  @JoinColumn({
    name: 'project_member_id',
  })
  project_member: ProjectMember;

}
