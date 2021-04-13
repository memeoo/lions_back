import { Column, Entity } from "typeorm";
import { CoreEntity } from "src/common/entities/core.entity";

@Entity()
export class Notice extends CoreEntity{

    @Column()
    clubId:number; 

    @Column()
    title:string; 

    @Column({nullable:true})
    content:string;

    @Column({nullable:true})
    imageUrl:string;
}