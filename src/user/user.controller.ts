import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Req, Delete, Param, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './entities/dtos/create-user.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('member')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // getAllmembers(): User[] {
  //   return this.userService.getAllUsers();
  // }

  @Get()
  getOneMember(@Req() req): Promise<User>{
    console.log(" params 00 >>> ", req.query);
    return this.userService.getOneMember(req.query.id);
  }

  @Get('club')
  getUsersInClub(@Req() req): Promise<Array<CreateUserDto>> {
    console.log(" params 11 => ", req.query);
    return this.userService.getUsersInClub(req.query.id);
  }

  @Delete()
  deleteUser(@Req() req): Promise<CoreOutput>{
    console.log(" params 22 => ", req.query);
    return this.userService.deleteUser(req.query.id);
  }  

  @Put()
  updateMember(@Body() createUserDto: CreateUserDto) : Promise<CoreOutput>{
    return this.userService.updateMember(createUserDto);
  }

  @Post()
  addMember(@Body() createUserDto: CreateUserDto) : Promise<CoreOutput>{
    return this.userService.addMember(createUserDto);
  }
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file){
    console.log("file upload => ", file);
  }
}
 