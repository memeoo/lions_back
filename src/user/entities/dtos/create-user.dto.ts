import { IsString, IsNumber, IsEmail, IsPhoneNumber, Min, Max, IsDate, Length} from 'class-validator';
export class CreateUserDto{
    name:string;
    
    positionClub:string;
    positionJigu:string;
    positionJiyeok:string;

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

    belongToJigu:number;
    belongToJiyeok:number;
    belongToJidae:number;

    deviceId:string;
}