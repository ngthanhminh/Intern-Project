import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { Project } from './project.entity';
import { Ticket } from './ticket.entity';

@Entity({
  name: 'projects_members',
})
export class Project_Member {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'member_id',
    type: 'int',
  })
  member_id: number;

  @Column({
    name: 'project_id',
    type: 'int',
  })
  project_id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @ManyToOne(type => Member)
  @JoinColumn({
    name: 'member_id',
  })
  @JoinTable()
  member: Member;

  @ManyToOne(type => Project)
  @JoinColumn({
    name: 'project_id',
  })
  @JoinTable()
  project: Project;

  @OneToMany(type => Ticket, (ticket) => ticket.project_member)
  ticket: Ticket[];

}
