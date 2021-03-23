import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Repository } from 'typeorm';
import { CreateClubDto } from './entities/dto/create-club.dto';
import {Jigu, Jiyeok, Jidae, Club} from './entities/group.entity'; 
// import { CreateUserDto } from './entities/dtos/create-user.dto';

interface resultVal {
  id:number,
  name:string,
  
}

interface clubInfo extends resultVal{
  sponsorClub:number,
}

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Jigu) private readonly jigus: Repository<Jigu>,
    @InjectRepository(Jiyeok) private readonly jiyeoks: Repository<Jiyeok>,
    @InjectRepository(Jidae) private readonly jidaes: Repository<Jidae>,
    @InjectRepository(Club) private readonly clubs: Repository<Club>
    ){}

    async getAllJigus(): Promise<resultVal[]> {
      const allJigus : resultVal[] = await this.jigus.find({
        select:["id","name"],
        order:{
          id:'ASC'
        }
      });
    allJigus.unshift({id:0, name:"지구를 입력하세요."});
    return allJigus;
  }

  async getJiyeoks(jiguId:string): Promise<resultVal[]> {
    const allJiyeoks : resultVal[] = await this.jiyeoks.find({
      select:["id","name"],
      where : {
        belongTo:jiguId
      },
      order :{
        id:'ASC'
      }
    });
    allJiyeoks.unshift({id:0, name:"지역을 입력하세요."});
    return allJiyeoks; 
  }

  async getJidaes(jiyeokId: string): Promise<resultVal[]> {
    const allJidaes : resultVal[] = await this.jidaes.find({
      select:["id","name"],
      where: {
        belongTo: jiyeokId
      },
      order: {
        id: 'ASC'
      }
    });
    console.log(" all selected jiyeok's jidaes => ", allJidaes);
    allJidaes.unshift({id:0, name:"지대를 입력하세요."});
    return allJidaes;
  }

  async getClubs(jidaeId:string): Promise<resultVal[]> {
    const allClubs : resultVal[] = await this.clubs.find({
      select:["id","name"],
      where: {
        belongTo: jidaeId
      },
      order: {
        id: 'ASC'
      }
    });
    console.log(" all selected jidae's allClubs => ", allClubs);
    allClubs.unshift({id:0, name:"클럽을 입력하세요."});
    return allClubs; 
  }

  async getClubInfo(clubId:number): Promise<resultVal[]> {
    const clubInfo : clubInfo[] = await this.clubs.find({
      where: {
        id: clubId
      }
    });
    console.log(" clubInfo >> ", clubInfo);
    const sponsorClubName : clubInfo[] = await this.clubs.find({
      select:["name"],
      where: {
        id: clubInfo[0].sponsorClub
      }
    });
    // console.log(" sponsorClubName => ", sponsorClubName[0].name);
    // clubInfo[0]['sponsorClubName'] = sponsorClubName[0].name;
    return clubInfo; 
  }

  async getAllClubs(): Promise<resultVal[]> {
    const allClubs : resultVal[] = await this.clubs.find({
      select:["id","name"],
      order: {
        id: 'ASC'
      }
    });
    console.log(" allClubs => ", allClubs);
    // allClubs.unshift({id:0, name:"클럽을 입력하세요."});
    return allClubs; 
  }


  async setClub(clubData : CreateClubDto): Promise<CoreOutput>{
    console.log(" clubData => ", clubData);
    // const mobile = clubData.mobileNum;
    // const exist = await this.clubs.findOne({mobileNum:mobile})
    // if(exist){
    //   // update 
    //   return {ok:false, error:'The user already exists'};
    // }
    const updatedClub = await this.clubs.update({id:clubData.id}, clubData);
    return {ok:true}  
  }
  
  // async addMember(userData : CreateUserDto): Promise<CoreOutput>{
  //   console.log(" userData => ", userData);
  //   const mobile = userData.mobileNum;
  //   const exist = await this.users.findOne({mobileNum:mobile})
  //   if(exist){
  //     return {ok:false, error:'The user already exists'};
  //   }

  //   const addedUser = await this.users.save(userData);
  //   return {ok:true}
  
  // }
}
