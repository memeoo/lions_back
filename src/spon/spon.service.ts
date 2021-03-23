import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Core } from 'aws-sdk/clients/greengrass';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Repository } from 'typeorm';
import { CreateSponDto } from './entities/dtos/create-spon.dto';
import { Spon } from './entities/spon.entity';

@Injectable()
export class SponService {
    constructor(
        @InjectRepository(Spon) private readonly spons: Repository<Spon>
    ){}

    async addSpon(sponData: CreateSponDto): Promise<CoreOutput> {
        console.log(" sponData add => ", sponData);
        const owner = sponData.owner;
        const exist = await this.spons.findOne({ owner: owner })
        if (exist) {
            // update 
            return { ok: false, error: 'The spon already exists' };
        }

        const addedSpon = await this.spons.save(sponData);
        return { ok: true }
    }
    
    async updateSpon(sponData: CreateSponDto): Promise<CoreOutput> {
        console.log(" sponData update => ", sponData);
        const addedSpon = await this.spons.save(sponData);
        return { ok: true }
    }

    async getSponByMember(memberId: number): Promise<Spon> {
        const sponInfo = await this.spons.findOne({owner: memberId});
        console.log("sponInfo >> ", sponInfo);
        return sponInfo;
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
}

