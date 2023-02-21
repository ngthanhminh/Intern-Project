import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Member } from './member.entity';
import { Project } from './project.entity';
import { Ticket } from './ticket.entity';

@Entity({
  name: 'joins',
})
export class Join {
  @PrimaryGeneratedColumn()
  member_id: number;

  @PrimaryColumn()
  project_id: number;

  
  @CreateDateColumn({
    name: 'join_date',
  })
  join_date: Date;

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

  @ManyToOne(type => Member)
  @JoinTable()
  member: Member;

  @ManyToOne(type => Project)
  @JoinTable()
  project: Project;

  @ManyToOne(type => Ticket)
  @JoinTable()
  ticket: Ticket;

}
