import { SponService } from './spon.service';
import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Req, Delete, Param, Put} from '@nestjs/common';
import { CreateSponDto, CreateSupportDto } from './entities/dtos/create-spon.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Spon } from './entities/spon.entity';
import { Support } from './entities/support.entity';
import {SponsorOutput, SupportOutput} from './spon.service';

@Controller('spon')
export class SponController {
    constructor(private readonly sponService: SponService) {}

    @Put()
    updateSpon(@Body() createSponDto: CreateSponDto) : Promise<SponsorOutput>{
      return this.sponService.updateSpon(createSponDto);
    }
  
    @Post()
    addSpon(@Body() createSponDto: CreateSponDto) : Promise<SponsorOutput>{
      return this.sponService.addSpon(createSponDto);
    }

    @Post('support')
    addSupport(@Body() createSupportDto: CreateSupportDto) : Promise<SupportOutput>{
      return this.sponService.addSupport(createSupportDto);
    }

    @Get('bymember')
    getSponsorByMember(@Req() req): Promise<Spon> {
        console.log(" params 11 => ", req.query);
        return this.sponService.getSponByMember(req.query.id);
    }

    @Get('supportByMember')
    getSupportByMember(@Req() req): Promise<Array<Support>> {
        console.log(" params 11 => ", req.query);
        return this.sponService.getSupportByMember(req.query.id);
    }

    @Delete()
    removeSponsorInfo(@Req() req): Promise<CoreOutput>{
      console.log(" delete params => ", req.query);
      return this.sponService.removeSponsorInfo(req.query.id);
    }

    @Delete('deleteSupport')
    deleteSupport(@Req() req): Promise<CoreOutput>{
      console.log(" deleteSupport=> ", req.query);
      return this.sponService.deleteSupport(req.query.id);
    }
    
}
