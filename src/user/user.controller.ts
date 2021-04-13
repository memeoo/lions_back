import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Req, Delete, Param, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './entities/dtos/create-user.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS  from 'aws-sdk';

export interface UpdatedMemberWithSponsor {
  memberId: number,
  sponsorId: number,
}

export interface UpdatedMemberWithSupport {
  memberId: number,
  supportCnt: number,
}

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

  @Get('jiguMembers')
  getJiguMembers(@Req() req): Promise<Array<CreateUserDto>> {
    console.log(" params 11 => ", req.query);
    return this.userService.getJiguMembers(req.query.id);
  }

  @Get('jiyeokMembers')
  getJiyeokMembers(@Req() req): Promise<Array<CreateUserDto>> {
    console.log(" params 11 => ", req.query);
    return this.userService.getJiyeokMembers(req.query.id);
  }

  @Delete()
  async deleteUser(@Req() req): Promise<CoreOutput> {
    console.log(" params 22 => ", req.query);
    const BUCKET_NAME = "clublions";
    const REGION = "ap-northeast-2";
    AWS.config.update({
      region: REGION,
      credentials: {
        accessKeyId: 'AKIAY3OJDC42R2W3MZLQ',
        secretAccessKey: '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'
      },
    })

    const {imgName} = await this.userService.getOneMember(req.query.id);
    console.log(" imgName => ", imgName);

    if(imgName){
      try{
        await new AWS.S3().deleteObject({
          Bucket: BUCKET_NAME,
          Key: imgName,
        }).promise();
      }catch(ex){
        console.log(" ex >>> ", ex);
      };
    }
    return this.userService.deleteUser(req.query.id);
    
  }  

  @Put()
  updateMember(@Body() createUserDto: CreateUserDto) : Promise<CoreOutput>{
    return this.userService.updateMember(createUserDto);
  }

  @Put('sponsor')
  updateMemberWithSponsorId(@Body() upadatedMemberWithSponsor: UpdatedMemberWithSponsor) : Promise<CoreOutput>{
    console.log("upadatedMemberWithSponsor nest >>>>  ", upadatedMemberWithSponsor);
    return this.userService.updateMemberWithSponsorId(upadatedMemberWithSponsor);
  }

  @Put('support')
  updateMemberWithSupportId(@Body() upadatedMemberWithSupport: UpdatedMemberWithSupport) : Promise<CoreOutput>{
    console.log("upadatedMemberWithSponsor nest >>>>  ", upadatedMemberWithSupport);
    return this.userService.updateMemberWithSupportId(upadatedMemberWithSupport);
  }


  @Post()
  addMember(@Body() createUserDto: CreateUserDto) : Promise<CoreOutput>{
    return this.userService.addMember(createUserDto);
  }
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Body() data){
    console.log("file upload => ", file);
    console.log("data => ", data);
    console.log("process.env.AWS_ACCESS_KEY => ", process.env.AWS_ACCESS_KEY);
    console.log("process.env.AWS_SECRET_ACCESS_KEY => ", process.env.AWS_SECRET_ACCESS_KEY);;

    const BUCKET_NAME = "clublions";
    const REGION = "ap-northeast-2";
    AWS.config.update({
      region: REGION,
      credentials:{
        accessKeyId: 'AKIAY3OJDC42R2W3MZLQ',
        secretAccessKey: '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'
      },
    })

    try{
      // const objectName = `${Date.now()+file.originalname}`
      const objectName = data.imgName
      await new AWS.S3().putObject({
        Body: file.buffer,
        Bucket: BUCKET_NAME,
        Key: objectName,
        ACL: 'public-read',  
      }).promise();

      const url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${objectName}`;
      
      return { url };
    }catch (e) {
      console.log(" eee >>> ", e);
      return null;
    }

  }
}
 