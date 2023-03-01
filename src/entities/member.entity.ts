import { ProjectMember } from './projectMember.entity';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity({
  name: 'members',
})
export class Member {
  @PrimaryGeneratedColumn()
  @Exclude()
  id?: number;

  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 255,
    name: 'name',
  })
  name: string;

  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 255,
    name: 'username',
    unique: true,
  })
  username: string;

  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 255,
    name: 'password',
  })
  password: string;

  @IsOptional()
  @Column({
    type: 'varchar',
    length: 255,
    name: 'avatar',
    nullable: true,
  })
  avatar?: string;

  @IsOptional()
  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;

  @IsOptional()
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at: Date;

  @IsOptional()
  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deleted_at ?: Date;

  @OneToMany(type => ProjectMember, (pm) => pm.member)
  tickets: ProjectMember[];

}
