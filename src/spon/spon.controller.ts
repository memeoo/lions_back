import { SponService } from './spon.service';
import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Req, Delete, Param, Put} from '@nestjs/common';
import { CreateSponDto } from './entities/dtos/create-spon.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Spon } from './entities/spon.entity';

@Controller('spon')
export class SponController {
    constructor(private readonly sponService: SponService) {}

    @Put()
    updateSpon(@Body() createSponDto: CreateSponDto) : Promise<CoreOutput>{
      return this.sponService.updateSpon(createSponDto);
    }
  
    @Post()
    addSpon(@Body() createSponDto: CreateSponDto) : Promise<CoreOutput>{
      return this.sponService.addSpon(createSponDto);
    }

    @Get('bymember')
    getSponsorByMember(@Req() req): Promise<Spon> {
        console.log(" params 11 => ", req.query);
        return this.sponService.getSponByMember(req.query.id);
    }

    @Delete()
    removeSponsorInfo(@Req() req): Promise<CoreOutput>{
      console.log(" delete params => ", req.query);
      return this.sponService.removeSponsorInfo(req.query.id);
    }
    
}
