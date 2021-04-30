import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from 'src/common/dtos/output.dto';
import {Admin} from '../admin.entity';

// @InputType()
// export class CreateAdminInput extends PickType(Admin, ['mId','pass', 'mobile', 'email', 'club','jidae','jiyeok','jigu']){

// }

export interface CreateAdminInput{
    mId:string;
    pass:string;
    mobile:string;
    club:number;
    jidae:number;
    jiyeok:number;
    jigu:number;
}
@ObjectType()
export class CreateAdminOutput extends CoreOutput{}
