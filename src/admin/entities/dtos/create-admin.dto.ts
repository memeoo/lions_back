import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from 'src/common/dtos/output.dto';
import {Admin} from '../admin.entity';

@InputType()
export class CreateAdminInput extends PickType(Admin, ['mId','pass', 'mobile', 'email']){

}

@ObjectType()
export class CreateAdminOutput extends CoreOutput{}
