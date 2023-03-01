import { Member } from '../entities/member.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {}
