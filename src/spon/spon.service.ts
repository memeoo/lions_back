import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Core } from 'aws-sdk/clients/greengrass';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Repository } from 'typeorm';
import { CreateSponDto, CreateSupportDto } from './entities/dtos/create-spon.dto';
import { Spon } from './entities/spon.entity';
import { Support } from './entities/support.entity';
import { SponsorNMember } from './spon.controller';

export interface SponsorOutput extends CoreOutput {
    ownerId?:number,
    sponsorId?: number,
}

export interface SupportOutput extends CoreOutput {
    ownerId?:number,
    supportId?: number,
}

@Injectable()
export class SponService {
    constructor(
        @InjectRepository(Spon) private readonly spons: Repository<Spon>,
        @InjectRepository(Support) private readonly supports: Repository<Support>
    ){}

    async addSpon(sponData: CreateSponDto): Promise<SponsorOutput> {
        console.log(" sponData add => ", sponData);
        const owner = sponData.owner;
        const exist = await this.spons.findOne({ owner: owner })
        if (exist) {
            // update 
            return { ok: false, error: 'The spon already exists' };
        }

        const addedSpon = await this.spons.save(sponData);
        console.log(" addedSpon => ", addedSpon);

        return { ok: true, ownerId: addedSpon.owner, sponsorId:addedSpon.id};
    }

    async addSupport(supportData: CreateSupportDto): Promise<SupportOutput> {
        console.log(" supportData add => ", supportData);
        const addedSupport = await this.supports.save(supportData);
        console.log(" addedSpon => ", addedSupport);
        return { ok: true, ownerId: addedSupport.owner, supportId:addedSupport.id};
    }
    
    async updateSpon(sponData: CreateSponDto): Promise<SponsorOutput> {
        console.log(" sponData update => ", sponData);
        const addedSpon = await this.spons.save(sponData);
        return { ok: true, ownerId: addedSpon.owner, sponsorId:addedSpon.id};
    }

    async getSponByMember(memberId: number): Promise<Spon> {
        const sponInfo = await this.spons.findOne({owner: memberId});
        console.log("sponInfo >> ", sponInfo);
        return sponInfo;
    }

    async getSupportByMember(memberId: number): Promise<Array<Support>> {
        // const supportInfo = await this.supports.find({owner: memberId});
        const supportInfo = await this.supports.find({where : {
            owner:memberId
          },
          order :{
            supportDay:'ASC'
          }});
        console.log("sponInfo >> ", supportInfo);
        return supportInfo;
    }

    async removeSponsorInfo(sponsorId: number): Promise<CoreOutput>{
        console.log(" sponsorId >>> ", sponsorId);
        const result = await this.spons.delete({id:sponsorId});
        console.log("result => ", result);
        
        if(result){
          return {ok:true, error:""};
        }else{
          return {ok:false, error:"error"};
        }
    }

    async deleteSupport(supportId: number): Promise<CoreOutput>{
        console.log(" supportId >>> ", supportId);
        const result = await this.supports.delete({id:supportId});
        console.log("result => ", result);
        if(result){
          return {ok:true, error:""};
        }else{
          return {ok:false, error:"error"};
        }
    }

    async getSponsorByUnit(unit: string, id: number) : Promise<Array<SponsorNMember>> {
        // unit : club, jidae, jiyeok, jigu // id: 해당 unit의 id ex) clubId, jidaeId, ....
        
        const sponWithMember = this.spons.createQueryBuilder("spon")
        .innerJoinAndSelect("spon.owner", "user")
        // .where("user.belongToJiyeok = :jiyeok ", {jiyeok : id})
        .getMany();
        console.log(" sponWithMember >> ", sponWithMember);
    
        return [];
      };

      
} 

