import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput, CreateAdminOutput } from './entities/dtos/create-admin.dto';
import {LoginInput, LoginOutput} from './entities/dtos/login.dto';


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly admins: Repository<Admin>
  ){}

  getAllAdmins(): Admin[] {
    let admins = [];
    return admins;
  }

  async createAdmin({
    mId,
    pass, 
    mobile,
    email,
  }: CreateAdminInput): Promise<CreateAdminOutput>{
    try {
      const exists = await this.admins.findOne({ mId });
      if (exists) {
        return { ok: false, error: 'There is a user with that id already' };
      }

      const admin = await this.admins.save(
        this.admins.create({ mId, pass, mobile, email}),
      );

      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login(paramObj: {mId:string, pass:string}): Promise<LoginOutput> {
    try {
      console.log(" paramObj > ", paramObj);
      const admin = await this.admins.findOne(
        { mId: paramObj.mId }
      );
      if (!admin) {
        return  {
          ok: false,
          error: 'Admin not found',
        };
      }
      const passwordCorrect = await admin.checkPassword(paramObj.pass);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }

      return {
        ok: true,
        token:"sssssss",
      };

    } catch (error) {
      return {
        ok: false,
        error: "Can't Admin log in.",
      };
    }
  }  

}
