import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "src/common/entities/core.entity";


@Entity()
export class User extends CoreEntity{

    @Column()
    name:string;

    @Column()
    position:string;

    @Column()
    startDay:string;

    @Column()
    job:string;

    @Column()
    address:string;

    @Column()
    mobileNum:string;

    @Column()
    phoneNumHome:string;

    @Column()
    phoneNumWork:string;

    @Column()
    email:string;

    @Column()
    belongTo:string;

    @Column({nullable:true})
    imgName:string;

}