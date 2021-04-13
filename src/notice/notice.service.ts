import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Core } from 'aws-sdk/clients/greengrass';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Repository } from 'typeorm';
import { CreateNoticeDto } from './entities/dtos/create-notice.dto';
import { Notice } from './entities/notice.entity';

export interface NoticeOutput extends CoreOutput {
    clubId?:number,
    noticeId?: number,
}

@Injectable()
export class NoticeService {
    constructor(
        @InjectRepository(Notice) private readonly notices: Repository<Notice>,
    ){}
    
    async addNotice(noticeData: CreateNoticeDto): Promise<NoticeOutput> {
        console.log(" noticeData add => ", noticeData);
        const addedNotice = await this.notices.save(noticeData);
        console.log(" addedNotice => ", addedNotice);
        return { ok: true};
    }
    
    async updateNotice(sponData: CreateNoticeDto): Promise<NoticeOutput> {
        console.log(" noticeData update => ", sponData);
        const addedNotice = await this.notices.save(sponData);
        return { ok: true };
    }

    async removeNotice(noticeId : number): Promise<NoticeOutput>{
        const result = await this.notices.delete({id:noticeId});
        console.log("result => ", result);
        
        if(result){
          return {ok:true, error:""};
        }else{
          return {ok:false, error:"error"};
        }
    }

    async getNoticeList(clubId: number): Promise<Array<Notice>> {
        const noticeList = await this.notices.find({clubId: clubId});
        console.log("noticeList >> ", noticeList);
        return noticeList;
    }

    async getSpecificNotice(noticeId: number): Promise<Notice> {
        const notice = await this.notices.findOne({id: noticeId});
        console.log("noticeList >> ", notice);
        return notice;
    }
}