import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Repository } from 'typeorm';
import { CreateClubDto } from './entities/dto/create-club.dto';
import { Jigu, Jiyeok, Jidae, Club } from './entities/group.entity';
import { User } from '../user/entities/user.entity';

// import { CreateUserDto } from './entities/dtos/create-user.dto';

type jidaeClub = {
  jidae: string,
  clubs: Array<Object>,
}

interface resultVal {
  id: number,
  name: string,
}

interface ChairManInClub {
  id: number,
  name: string,
  imgName: string,

}

interface ChairManClubJidae {
  jidae
  clubName: number,
  name: string,
  imgName: string,

}


interface clubInfo extends resultVal {
  sponsorClub: number,
}

export interface BelongToInfo {
  belongTo: number,
  jiyeokId: number,
  jiguId: number,
}

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Jigu) private readonly jigus: Repository<Jigu>,
    @InjectRepository(Jiyeok) private readonly jiyeoks: Repository<Jiyeok>,
    @InjectRepository(Jidae) private readonly jidaes: Repository<Jidae>,
    @InjectRepository(Club) private readonly clubs: Repository<Club>,
    @InjectRepository(User) private readonly users: Repository<User>
  ) { }

  async getAllJigus(): Promise<resultVal[]> {
    const allJigus: resultVal[] = await this.jigus.find({
      select: ["id", "name"],
      order: {
        id: 'ASC'
      }
    });
    allJigus.unshift({ id: 0, name: "지구를 입력하세요." });
    return allJigus;
  }

  async getOneJigu(jiguId:string): Promise<resultVal> {
    const aJigu: resultVal = await this.jigus.findOne({
      select: ["id", "name"],
      order: {
        id: 'ASC'
      },
      where:{
        id:jiguId,
      }
    });

    return aJigu;
  }
  
  async getJiyeoks(jiguId: string): Promise<resultVal[]> {
    const allJiyeoks: resultVal[] = await this.jiyeoks.find({
      select: ["id", "name"],
      where: {
        belongTo: jiguId
      },
      order: {
        id: 'ASC'
      }
    });
    allJiyeoks.unshift({ id: 0, name: "지역을 입력하세요." });
    return allJiyeoks;
  }

  async getOneJiyeok(jiyeokId:string): Promise<resultVal> {
    const aJiyeok: resultVal = await this.jiyeoks.findOne({
      select: ["id", "name"],
      order: {
        id: 'ASC'
      },
      where:{
        id:jiyeokId,
      }
    });

    return aJiyeok;
  }

  async getJidaes(jiyeokId: string): Promise<resultVal[]> {
    const allJidaes: resultVal[] = await this.jidaes.find({
      select: ["id", "name"],
      where: {
        belongTo: jiyeokId
      },
      order: {
        id: 'ASC'
      }
    });
    console.log(" all selected jiyeok's jidaes => ", allJidaes);
    allJidaes.unshift({ id: 0, name: "지대를 입력하세요." });
    return allJidaes;
  }

  async getOneJidae(jidaeId: number): Promise<resultVal> {
    const oneJidae : resultVal = await this.jidaes.findOne({
      select: ["id", "name"],
      where: {
        id: jidaeId
      }
    });
    console.log(" oneJidae => ", oneJidae);

    return oneJidae;
  }

  async getClubs(jidaeId: string): Promise<resultVal[]> {
    const allClubs: resultVal[] = await this.clubs.find({
      select: ["id", "name"],
      where: {
        belongTo: jidaeId
      },
      order: {
        id: 'ASC'
      }
    });
    console.log(" all selected jidae's allClubs => ", allClubs);
    allClubs.unshift({ id: 0, name: "클럽을 입력하세요." });
    return allClubs;
  }

  async getClubInfo(clubId: number): Promise<any> {
    const clubInfo: clubInfo[] = await this.clubs.find({
      where: {
        id: clubId
      }
    });
    console.log(" clubInfo >> ", clubInfo);
    const sponsorClubName: clubInfo[] = await this.clubs.find({
      select: ["name"],
      where: {
        id: clubInfo[0].sponsorClub
      }
    });
    // console.log(" sponsorClubName => ", sponsorClubName[0].name);
    // clubInfo[0]['sponsorClubName'] = sponsorClubName[0].name;
    let returnVal = {
      clubInfo: clubInfo[0],
      sponsorClubName: sponsorClubName[0] ? sponsorClubName[0].name : "",
    }
    console.log(" returnVal >>>>>>>>> ", returnVal);
    return returnVal;
    
  }

  async getAllClubs(): Promise<resultVal[]> {
    const allClubs: resultVal[] = await this.clubs.find({
      select: ["id", "name"],
      order: {
        name: 'ASC'
      } 
    });
    console.log(" allClubs => ", allClubs);
    // allClubs.unshift({id:0, name:"클럽을 입력하세요."});
    return allClubs;
  }

  async getJiguClubs(jiguId: number): Promise<resultVal[]> {
    const jiguClubs: resultVal[] = await this.clubs.find({
      select: ["id", "name"],
      order: {
        id: 'ASC'
      }
    });
    return jiguClubs;
  }

  async getJiyeokClubs(jiyeokId: number): Promise<Array<jidaeClub>> {
    const jidaes = await this.jidaes.find({
      select: ["id", "name"],
      order: {
        id: 'ASC'
      },
      where: {
        belongTo: jiyeokId
      }
    });
    console.log(" jidaes ==> ", jidaes);

    let finalClubs = [];
    for (let i = 0; i < jidaes.length; i++) {
      let eachClubs = await this.getJidaeClubs(jidaes[i].id);

      let clubNChairman = [];
      for (let j = 0; j < eachClubs.length; j++) {
        let chairManInfo = await this.getChairmanInClub(eachClubs[j].id);
        clubNChairman.push({
          clubInfo: eachClubs[j], chairmanInfo: chairManInfo
        });

      };

      // let clubNChairman = eachClubs.map(each => {
      //    let chairManInfo = this.getChairmanInClub(each.id);
      //    return {clubInfo: each, chairmanInfo: chairManInfo};
      // });

      finalClubs.push({ jidae: jidaes[i].name, clubs: clubNChairman });
    }
    console.log(" finalClubs ==> ", finalClubs);
    return finalClubs;
  }

  async getJidaeClubs(jidaeId: number): Promise<resultVal[]> {
    const getJidaeClubs: resultVal[] = await this.clubs.find({
      order: {
        id: 'ASC'
      },
      where: {
        belongTo: jidaeId
      }
    });

    return getJidaeClubs;
  }

  async getChairmanInClub(clubId: number): Promise<ChairManInClub> {
    const chairmanInClub = await this.users.findOne({
      select: ["id", "name", "imgName"],
      where: {
        belongTo: clubId,
        positionClub: "회장"
      }
    });
    return chairmanInClub;
  }

  async setClub(clubData: CreateClubDto): Promise<CoreOutput> {
    console.log(" clubData => ", clubData);
    // const mobile = clubData.mobileNum;
    // const exist = await this.clubs.findOne({mobileNum:mobile})
    // if(exist){
    //   // update 
    //   return {ok:false, error:'The user already exists'};
    // }
    const updatedClub = await this.clubs.update({ id: clubData.id }, clubData);
    return { ok: true }
  }

  async getBelongToFromClub(clubId: number): Promise<BelongToInfo> {
    const belongToInfo = await this.clubs.findOne({
      select: ["belongTo", "jiyeokId", "jiguId"],
      where: {
        id: clubId
      }
    });
    console.log(" belongToInfo >> ", belongToInfo);
    return belongToInfo;
  }

}
