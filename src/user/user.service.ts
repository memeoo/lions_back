import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, SelectQueryBuilder} from "typeorm";
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './entities/dtos/create-user.dto';
import { User } from './entities/user.entity';
import { Club } from '../group/entities/group.entity';
import {Support} from '../spon/entities/support.entity';
import {UpdatedMemberWithSponsor, UpdatedMemberWithSupport, UpdatedMemberWithDeviceId} from './user.controller';
import { SponsorNMember } from 'src/spon/spon.controller';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Club) private readonly clubs: Repository<Club>,
    @InjectRepository(Support) private readonly supports: Repository<Support>,
  ){}
  
  getAllUsers(): User[] {
    let users = [];
    return users;
  }

  async getUsersInClub(clubId: number) : Promise<Array<any>>{
    // const users = await this.users.find({
    //   where : {
    //     belongTo:clubId
    //   },
    //   order :{
    //     id:'ASC'
    //   }
    // });

    const users = await this.users.createQueryBuilder("member")
    .leftJoinAndSelect("member.sponId", "spon")
    .where("member.belongTo = :clubId", {clubId:clubId})
    .orderBy('member.positionClubVal', 'ASC')
    .getMany()

    console.log(" users >> ", users);
    return users;
  } 

  async getUsersInClubMobile(clubId: number) : Promise<Array<any>>{
    // const users = await this.users.find({
    //   where : {
    //     belongTo:clubId
    //   },
    //   order :{
    //     id:'ASC'
    //   }
    // });

    const users = await this.users.createQueryBuilder("member")
    .leftJoinAndSelect("member.sponId", "spon")
    .where("member.belongTo = :clubId", {clubId:clubId})
    .orderBy({'member.positionClubVal':'ASC', 'member.startDay' :'ASC'})
    .getMany()

    console.log(" users @@ >> ", users);
    return users;
  } 

  
  async getJiguMembers(jiguId: number) : Promise<Array<CreateUserDto>>{
    const jigumembers = this.users.createQueryBuilder("member")
    .leftJoinAndSelect("member.belongTo", "club")
    .where("member.belongToJigu = :jiguId ", {jiguId : jiguId})
    // .andWhere("member.positionJiguVal != :zero", {zero: 0})
    .andWhere("member.positionJigu is not null OR member.positionFreeJigu is not null")
    .andWhere("member.positionJiguVal != :val", {val:0})
    // .andWhere("member.positionJiguVal != :val", {val:null})
    .orderBy({'member.positionJiguVal':'ASC','member.startDay' :'ASC'})
    .getMany();
    
    return jigumembers.then(resolve => {
      return resolve.filter(member =>{
        return member.positionJiguVal !== 0;
      });
    }).catch(error => {
      return [];
    });
  }

  async getJiyeokMembers(jiyeokId: number) : Promise<Array<CreateUserDto>>{
    const jiyeokmembers = this.users.createQueryBuilder("member")
    .leftJoinAndSelect("member.belongTo", "club")
    .where("member.belongToJiyeok = :jiyeokId ", {jiyeokId : jiyeokId})
    .andWhere("member.positionJiyeok is not null OR member.positionFreeJiyeok is not null")
    .andWhere("member.positionJiyeokVal != :val", {val:0})
    // .andWhere("member.positionJiyeokVal != :val", {val:null})
    .orderBy({'member.positionJiyeokVal':'ASC', 'member.startDay' :'ASC'})
    .getMany();
    console.log(" jiyeokMembers >> ", jiyeokmembers);

    return jiyeokmembers.then(resolve => {
      return resolve.filter(member =>{
        return member.positionJiyeokVal !== 0;
      });
    }).catch(error => {
      return [];
    });
  
  }

  async getSponsorByUnit(unit: string, id: number) : Promise<Array<any>> {
    // unit : club-belongTo, jidae-belongToJidae, jiyeok-belongToJiyeok, jigu-belongToJigu // id: 해당 unit의 id ex) clubId, jidaeId, ....
    let whereStatement = "user."+unit+" = :unit "; 
    
    const sponWithMember = this.users.createQueryBuilder("user")
    .leftJoinAndSelect("user.sponId", "spon")
    .where(whereStatement, {unit : id})
    .andWhere("user.sponId is not null")
    .orderBy({'user.id':'ASC'})
    .getMany();
    console.log(" sponWithMember >> ", sponWithMember);

    return sponWithMember;
  };

  async deleteUser(userId: number): Promise<CoreOutput>{
    const result = await this.users.delete({id:userId});
    console.log(" delete user result => ", result);
    
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
    console.log(" addedUser => ", addedUser);

    return {ok:true}  
  }

  async updateMember(userData : CreateUserDto): Promise<CoreOutput>{
    console.log(" userData => ", userData);
    const addedUser = await this.users.save(userData);
    return {ok:true}
  }

  async updateMemberWithSponsorId(updatedMemberWithSponsor: UpdatedMemberWithSponsor) : Promise<CoreOutput>{
    console.log(" updatedMemberWithSponsor service >> ", updatedMemberWithSponsor);
    const updatedUser = await this.users.update(updatedMemberWithSponsor.memberId, {sponId: updatedMemberWithSponsor.sponsorId});
    
    console.log(" updatedMemberWithSponsor updatedUser >> ", updatedUser);
    return {ok:true};
  }

  async updateMemberWithSupportId(updatedMemberWithSupport: UpdatedMemberWithSupport) : Promise<CoreOutput>{
    console.log(" updatedMemberWithSponsor service >> ", updatedMemberWithSupport);
    let [allSupports, supportCount] = await this.supports.findAndCount({where:{ owner: updatedMemberWithSupport.memberId }});
    console.log(" supportCount >> ", supportCount);
    const updatedUser = await this.users.update(updatedMemberWithSupport.memberId, {supportCnt: supportCount});
    console.log(" updatedMemberWithSponsor updatedUser >> ", updatedUser);
    return {ok:true};
  }

  
  async updateMemberWithDeviceId(updateMemberWithDeviceId: UpdatedMemberWithDeviceId) : Promise<CoreOutput>{
    console.log(" updatedMemberWithSponsor service >> ", updateMemberWithDeviceId);
    const updatedUser = await this.users.update(updateMemberWithDeviceId.memberId, {deviceId: updateMemberWithDeviceId.deviceId});
    console.log(" updatedMemberWithSponsor updatedUser >> ", updatedUser);
    return {ok:true};
  }

  async getOneMember(userId: number) : Promise<User>{
    console.log(" userId => ", userId);
    const user = await this.users.findOne({id:userId});
    console.log(" one user => ", user);
    return user;
  }

  async getOneByDeviceId(deviceId: string) : Promise<User>{
    console.log(" deviceId => ", deviceId);
    // const user = await this.users.findOne({deviceId:deviceId});
    const user = await this.users.createQueryBuilder("member")
    .where("member.deviceId = :deviceId", {deviceId:deviceId})
    .getOne();
    console.log(" one user => ", user);
    return user;
  }

  async getOneByPhoneNum(phoneNum: string) : Promise<User>{
    console.log(" phoneNum => ", phoneNum);
    const user = await this.users.findOne({mobileNum:phoneNum});
    console.log(" one user => ", user);
    return user;
  }


}
