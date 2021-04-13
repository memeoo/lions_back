import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "src/common/entities/core.entity";
import { Club } from "src/group/entities/group.entity";


@Entity()
export class User extends CoreEntity{

    @Column()
    name:string;

    @Column({nullable:true})
    positionClub:string;

    @Column({nullable:true})
    positionJigu:string;

    @Column({nullable:true})
    positionJiyeok:string;
    
    @Column({nullable:true})
    positionFreeClub:string;

    @Column({nullable:true})
    positionFreeJigu:string;

    @Column({nullable:true})
    positionFreeJiyeok:string;

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

    @ManyToOne(type => Club, club => club.id)
    belongTo:number;

    @Column({nullable:true})
    belongToJidae:number;

    @Column({nullable:true})
    belongToJiyeok:number;

    @Column({nullable:true})
    belongToJigu:number;

    @Column({nullable:true})
    imgName:string;
    
    @Column({nullable:true})
    sponId:number;

    @Column({nullable:true})
    supportCnt:number;

}