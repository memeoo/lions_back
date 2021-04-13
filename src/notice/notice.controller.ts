import { Controller, Get, Post, Body, UploadedFile, Req, Put, Delete} from '@nestjs/common';
import { CreateNoticeDto } from './entities/dtos/create-notice.dto';
import { Notice } from './entities/notice.entity';
import { NoticeService } from './notice.service';
import { NoticeOutput } from './notice.service';

@Controller('notice')
export class NoticeController {
    constructor(private readonly noticeService: NoticeService) {}

    @Put()
    updateNotice(@Body() createNoticeDto: CreateNoticeDto) : Promise<NoticeOutput>{
      return this.noticeService.updateNotice(createNoticeDto);
    }
  
    @Post()
    addNotice(@Body() createSponDto: CreateNoticeDto) : Promise<NoticeOutput>{
      return this.noticeService.addNotice(createSponDto);
    }

    @Get()
    getNoticeList(@Req() req): Promise<Array<Notice>> {
        console.log(" params 11 => ", req.query);
        return this.noticeService.getNoticeList(req.query.id);
    }

    @Delete()
    removeNotice(@Req() req): Promise<NoticeOutput>{
      console.log(" delete params => ", req.query);
      return this.noticeService.removeNotice(req.query.id);
    }

    @Get('specific')
    getSpecificNotice(@Req() req): Promise<Notice> {
        console.log(" params 11 => ", req.query);
        return this.noticeService.getSpecificNotice(req.query.id);
    }

}
