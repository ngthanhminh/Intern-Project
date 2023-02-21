import { MemberDto } from './../../dto/member.dto';
import { 
     HttpException, 
     HttpStatus, 
     Injectable, 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from 'src/entities/member.entity';

@Injectable()
export class MemberService {
     constructor(
          @InjectRepository(Member)
          private membersRepository: Repository<Member>,
     ) {} 

     // get list members, find member with name & username 
     async getListMembers(username ?: string, name ?: string): Promise<Partial<MemberDto>[]> {
          try {
               if(name !== undefined || username !== undefined) 
                    return await this.membersRepository.find({
                         select: 
                              ['id', 'name', 'username', 'avatar', 'createdAt', 'updatedAt', 'deletedAt'],
                         where: [
                              {name: name},
                              {username: username},
                         ],
                    })
               return await this.membersRepository.find({
                    select:
                         ['id', 'name', 'username', 'avatar', 'createdAt', 'updatedAt', 'deletedAt']
               });             
          }
          catch(error) {
               console.log(error);
               throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
          }
     }

     //  create member
     async createMember(memberData: Partial<MemberDto>): Promise<Partial<MemberDto>> {
          try {
               const newMember = await this.membersRepository.save(await MemberDto.createEntity(memberData));
               newMember.password = undefined;
               return newMember;
          }
          catch(error){
               console.log(error);
               throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
          };
     }

     // update member 
     async updateMember(id : number, member: Partial<MemberDto>): Promise<Partial<MemberDto>> {
          try {
               await this.membersRepository.update(id, await MemberDto.updateEntity(member));
               const member2 = await this.membersRepository.findOne({id: id});
               member2.password = undefined;
               return member2;
          }
          catch(error) {
               console.log(error);
               throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
          }
     }

}
