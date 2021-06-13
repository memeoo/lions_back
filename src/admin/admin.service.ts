import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput, CreateAdminOutput } from './entities/dtos/create-admin.dto';
import {LoginInput, LoginOutput, AdminInfo} from './entities/dtos/login.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly admins: Repository<Admin>
  ){}

  getAllAdmins(): Admin[] {
    let admins = [];
    return admins;
  }

  async createAdmin(createAdminInput: CreateAdminInput): Promise<CreateAdminOutput>{
    try {
      const exists = await this.admins.findOne({mId: createAdminInput.mId});
      if (exists) {
        return { ok: false, error: 'There is a user with that id already' };
      }
      const admin = await this.admins.save(createAdminInput);
      return { ok: true };

    } catch (e) {
      console.log(" e >>>> ", e);
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async getOneAdminInfo(adminId: number) : Promise<Admin>{
    const admin = await this.admins.findOne({id:adminId});
    return admin;
  }

  async login(paramObj: {mId:string, pass:string}): Promise<LoginOutput> {
    try {
      console.log(" paramObj > ", paramObj);
      const admin = await this.admins.findOne(
        { 
          where:[
            {mId: paramObj.mId, pass: paramObj.pass}
          ] 
        }
      );

      console.log(" admin => ", admin);
      if (!admin) {
        return  {
          ok: false,
          error: 'Admin not found',
        };
      }else{
        if(!admin.isConfirmed){
          return  {
            ok: false,
            error: 'Admin not confirmed',
          };
        }else{
          let adminInfo = {
            id:admin.id,
            club:admin.club,
            jidae:admin.jidae,
            jiyeok:admin.jiyeok,
            jigu:admin.jigu,
          }
    
          return {
            ok: true,
            token:"sssssss",
            adminInfo: adminInfo
          };
        }
      }

      // const passwordCorrect = await admin.checkPassword(paramObj.pass);
      // console.log(" passwordCorrect > ", passwordCorrect);

      // if (!passwordCorrect) {
      //   return {
      //     ok: false,
      //     error: 'Wrong password',
      //   };
      // }

    } catch (error) {
      return {
        ok: false,
        error: "Can't Admin log in.",
      };
    }
  }  

}
