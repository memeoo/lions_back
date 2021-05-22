import { Controller, Get, Post, Body, UploadedFile, Req, Put, Delete} from '@nestjs/common';
import { CreateNoticePushDto } from './push.service';
import { PushService } from './push.service';
import { NoticeOutput } from './push.service';

@Controller('push')
export class PushController {
    constructor(private readonly pushService: PushService) {}

    @Post()
    sendPush(@Body() createPushDto: CreateNoticePushDto) : Promise<NoticeOutput>{
      return this.pushService.sendPush(createPushDto);
    }

    @Get()
    getPushUsers(@Req() req): Promise<any> {
        console.log(" params 11 => ", req.query);
        return this.pushService.getUsers();
    }

}
