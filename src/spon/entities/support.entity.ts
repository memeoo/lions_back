import { Column, Entity } from "typeorm";
import { CoreEntity } from "src/common/entities/core.entity";


@Entity()
export class Support extends CoreEntity{

    @Column()
    owner:number; // member id to do support

    @Column({nullable:true})
    support:string;

    @Column({nullable:true})
    supportMoney:string;

    @Column({nullable:true})
    supportDay:string;

    @Column({nullable:true})
    type:string;
}