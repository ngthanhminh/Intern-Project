import { Transform } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Member } from './member.entity';
import { Project } from './project.entity';

@Entity({
  name: 'tickets',
})
export class Ticket {
  @PrimaryGeneratedColumn()
  id ?: number;

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
  createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @CreateDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;

  @ManyToOne(type => Project, (project) => project.tickets)
  project: Project;

  @ManyToOne(type => Member, (member) => member.tickets)
  @Transform(value => {
    if (value !== null) {
      return value;
    }
  })
  assign: Member;

}
