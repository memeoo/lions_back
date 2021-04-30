import { Controller, Get, Param, Post, Req, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
// import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateAdminInput, CreateAdminOutput } from './entities/dtos/create-admin.dto';
import { LoginInput, LoginOutput } from './entities/dtos/login.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  
  // getAllAdmins(): Admin[] {
  //   return this.adminService.getAllAdmins();
  // }

  @Get()
  async login(@Req() req) {
    return this.adminService.login(req.query)
  }

  
  @Post()
  async signup(@Body() createAdminInput: CreateAdminInput) {
    return this.adminService.createAdmin(createAdminInput)
  }


  // @Get('test')
  // test() {
  //   console.log(" !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ");
  //   return {ok:true, error:null}
  // }
}
