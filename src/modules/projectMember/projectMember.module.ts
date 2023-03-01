import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectMemberRepository } from '../../repositories/projectMember.repository';
import { ProjectMemberController } from './projectMember.controller';
import { ProjectMemberService } from './projectMember.service';

@Module({
     imports: [TypeOrmModule.forFeature([ProjectMemberRepository])],
     controllers: [ProjectMemberController],
     providers: [ProjectMemberService],
     exports: [ProjectMemberService,]
})
export class ProjectMemberModule {}
