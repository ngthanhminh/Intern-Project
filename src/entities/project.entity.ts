import { isNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { ProjectType } from '../enum/projectType.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity({
  name: 'projects',
})
export class Project {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'nvarchar',
    length: 255,
    name: 'name',
    unique: true,
  })
  name: string;

  @CreateDateColumn({
    name: 'start_date',
  })
  start_date: Date;  

  @Column({
    name: 'end_date',
  })
  end_date: Date;

  @Column({
    type: 'varchar',
    name: 'project_type',
    default: 'LABOUR',
  })
  project_type: string;

  @Column({
    type: 'bigint',
    name: 'expected_profit',
    nullable: true,
  })
  expected_profit: bigint;

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deleted_at: Date;

  @OneToMany(type => Ticket, (ticket) => ticket.project)
  tickets: Ticket[];

}
