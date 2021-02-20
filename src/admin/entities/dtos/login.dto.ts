import { CoreOutput } from 'src/common/dtos/output.dto';
import { Admin } from '../admin.entity';

export class LoginInput {
  
}

export class LoginOutput extends CoreOutput {
  token?: string;
}