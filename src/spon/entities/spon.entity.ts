import { Column, Entity, OneToOne } from "typeorm";
import { CoreEntity} from "src/common/entities/core.entity";
import { User } from "src/user/entities/user.entity";
@Entity()
export class Spon extends CoreEntity{

    @Column({nullable:true})
    owner:number; //  owner -> userId

    @Column({nullable:true})
    address:string;

    @Column({nullable:true})
    contact1:string;

    @Column({nullable:true})
    contact2:string;

    @Column({nullable:true})
    title:string;

    @Column({nullable:true})
    homepage:string;

    @Column({nullable:true})
    sponsorImgName:string;

    @Column({nullable:true})
    type:string;
}