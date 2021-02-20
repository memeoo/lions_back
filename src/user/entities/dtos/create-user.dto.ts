import { IsString, IsNumber, IsEmail, IsPhoneNumber, Min, Max, IsDate, Length} from 'class-validator';
export class CreateUserDto{
    name:string;
    position:string;  
    startDay:string;
    job:string;
    address:string;
    mobileNum:string;
    phoneNumHome:string;
    phoneNumWork:string;
    email:string;
    belongTo:string;
}