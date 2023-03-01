import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Member } from './entities/member.entity';
import { Project } from './entities/project.entity';
import { ProjectMember } from './entities/projectMember.entity';
import { Ticket } from './entities/ticket.entity';
import { MemberModule } from './modules/member/member.module';
import { ProjectModule } from './modules/project/project.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { ProjectMemberModule } from './modules/projectMember/projectMember.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Member, Ticket, Project, ProjectMember],
    }),
    MemberModule,
    ProjectModule, 
    TicketModule, 
    ProjectMemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
