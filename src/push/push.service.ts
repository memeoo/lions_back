import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import * as admin from 'firebase-admin'


export interface NoticeOutput extends CoreOutput {
    clubId?:number,
    noticeId?: number,
}

export interface CreateNoticePushDto {
    id:number;
    title:string;
    content:string;
}

@Injectable()
export class PushService {
    constructor(private firebaseAuth: FirebaseAuthenticationService) {

    }

    async getUsers() {
        return this.firebaseAuth.listUsers()
    }
    
    async sendPush(pushData: CreateNoticePushDto): Promise<NoticeOutput> {
        console.log(" send pushData => ", pushData);
        let message = {

        }
        // admin.messaging().send(pushData);
        // const addedNotice = await this.notices.save(noticeData);
        // console.log(" addedNotice => ", addedNotice);
        return { ok: true};
    }
    
}