import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './entities/dtos/create-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>
  ){}
  
  getAllUsers(): User[] {
    let users = [];
    return users;
  }

  async getUsersInClub(clubId: string) : Promise<Array<CreateUserDto>>{
    const users = await this.users.find({
      where : {
        belongTo:clubId
      },
      order :{
        id:'ASC'
      }
    });
    return users;
  }

  async deleteUser(userId: number): Promise<CoreOutput>{
    const result = await this.users.delete({id:userId});
    console.log("result => ", result);
    
    if(result){
      return {ok:true, error:""};
    }else{
      return {ok:false, error:"error"};
    }
   
  }

  async addMember(userData : CreateUserDto): Promise<CoreOutput>{
    console.log(" userData => ", userData);
    const mobile = userData.mobileNum;
    const exist = await this.users.findOne({mobileNum:mobile})
    if(exist){
      // update 
      return {ok:false, error:'The user already exists'};
    }

    const addedUser = await this.users.save(userData);
    return {ok:true}  
  }

  async updateMember(userData : CreateUserDto): Promise<CoreOutput>{
    console.log(" userData => ", userData);
    // const mobile = userData.mobileNum;
    // const exist = await this.users.findOne({mobileNum:mobile})
    // if(exist){
    //   // update 
    //   return {ok:false, error:'The user already exists'};
    // }

    const addedUser = await this.users.save(userData);
    return {ok:true}
  
  }

  async getOneMember(userId: number) : Promise<User>{
    console.log(" userId => ", userId);
    const user = await this.users.findOne({id:userId});
    console.log(" one user => ", user);
    return user;
  }
}
