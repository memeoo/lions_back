import { CoreOutput } from 'src/common/dtos/output.dto';
import { Admin } from '../admin.entity';

export interface AdminInfo {
  id:number;
  club:number;
  jidae:number;
  jiyeok:number;
  jigu:number;
}
export class LoginInput {
  
}

export class LoginOutput extends CoreOutput {
  token?: string;
  adminInfo?: AdminInfo;
}