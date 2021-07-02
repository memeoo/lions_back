import { IsString, IsNumber, IsEmail, IsPhoneNumber, Min, Max, IsDate, Length} from 'class-validator';
export class CreateUserDto{
    name:string;
    
    positionClub:string;
    positionJigu:string;
    positionJiyeok:string;

    positionClubVal:number;
    positionJiguVal:number;
    positionJiyeokVal:number;

    positionFreeClub:string;  
    positionFreeJigu:string;
    positionFreeJiyeok:string;  

    startDay:string;
    job:string;
    address:string;
    mobileNum:string;
    phoneNumHome:string;
    phoneNumWork:string;
    email:string;
    belongTo:number;
    belongToClub:number;
    sponIdId?:number;

    clubName:string;
    belongToJigu:number;
    belongToJiyeok:number;
    belongToJidae:number;

    deviceId:string;
    englishName:string;
    memberNo:string;

    slogan:string;    //kind of etc (기타 정보)

}