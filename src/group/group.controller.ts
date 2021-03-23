import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { GroupService } from './group.service';
import { Jigu, Jiyeok, Jidae, Club } from './entities/group.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateClubDto } from './entities/dto/create-club.dto';
// import { CreateUserDto } from './entities/dtos/create-user.dto';

interface resultVal {
  id:number,
  name:string,
}

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('jigu')
  getAllJigus(): Promise<resultVal[]> {
    return this.groupService.getAllJigus();
  }

  @Get('jiyeok')
  getJiyeoks(@Req() req): Promise<resultVal[]> {
    return this.groupService.getJiyeoks(req.query.id);
  }

  @Get('jidae')
  getJidaes(@Req() req): Promise<resultVal[]> {
    console.log(" params query => ", req.query);
    return this.groupService.getJidaes(req.query.id);
  }

  @Get('club')
  getClubs(@Req() req): Promise<resultVal[]> {
    console.log(" params query => ", req.query);
    return this.groupService.getClubs(req.query.id);
  }

  @Get('allclubs')
  getAllClubs(@Req() req): Promise<resultVal[]> {
    console.log(" params query => ", req.query);
    return this.groupService.getAllClubs();
  }

  @Get('clubInfo')
  getClubInfo(@Req() req): Promise<resultVal[]> {
    console.log(" params query => ", req.query);
    return this.groupService.getClubInfo(req.query.id);
  }

  
  @Post('club')
  setClubInfo(@Body() createClubDto : CreateClubDto): Promise<CoreOutput> {
    return this.groupService.setClub(createClubDto);
  }

  // @Post()
  // addMember(@Body() createUserDto: CreateUserDto) : Promise<CoreOutput>{
  //   return this.userService.addMember(createUserDto);
  // } 
}
 