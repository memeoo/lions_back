import { Column, Entity } from "typeorm";
import { CoreEntity } from "src/common/entities/core.entity";
@Entity()
export class Spon extends CoreEntity{

    @Column()
    owner:number; // member id to do sponsor

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