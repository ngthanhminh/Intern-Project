import { ProjectMember } from './../../entities/projectMember.entity';
import { MemberDto } from './../../dto/member.dto';
import { 
     Controller,
     Get,
     Post,
     Put,
     Delete,
     Param,
     Query,
     Body,
     UseFilters,
     HttpException,
     ValidationPipe,
     UsePipes,
     ParseIntPipe,
     Patch,
     ParseArrayPipe,
} from '@nestjs/common';
import { Member } from 'src/entities/member.entity';
import { MemberService } from './member.service';

@UsePipes(ValidationPipe)
@Controller('member')
export class MemberController {
     constructor(private readonly memberService: MemberService){}

     @Get()
     async getMembers(
          @Query('name') name ?: string,
          @Query('username') username ?: string,
     ): Promise<Partial<MemberDto>[]> {
          return this.memberService.getListMembers(username, name);
     }

     @Post()
     async create(
          @Body() member: Member,
     ): Promise<Partial<Member>> {
          return this.memberService.createMember(member);
     }

     @Patch(':id') 
     async update(
          @Body() member: Partial<MemberDto>,
          @Param('id', ParseIntPipe) id : number
     ): Promise<Partial<MemberDto>> {
          return this.memberService.updateMember(id, member);
     }

     
     @Patch(':memberId/ticket/')
     assignTickets(
          @Param('memberId', ParseIntPipe) memberId: number,
          @Body('ticketIds', ParseArrayPipe) ticketIds: number[],
     ): Promise<ProjectMember> {
          return this.memberService.assignTicketForMember(memberId, ticketIds);
     }
}
