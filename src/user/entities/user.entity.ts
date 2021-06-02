import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "src/common/entities/core.entity";
import { Club } from "src/group/entities/group.entity";
import { Spon } from "src/spon/entities/spon.entity";

@Entity()
export class User extends CoreEntity{

    @Column()
    name:string;

    @Column({nullable:true})
    positionClub:string;

    @Column({nullable:true})
    positionClubVal:number;

    @Column({nullable:true})
    positionJigu:string;

    @Column({nullable:true})
    positionJiguVal:number;

    @Column({nullable:true})
    positionJiyeok:string;
    
    @Column({nullable:true})
    positionJiyeokVal:number;
    
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
    clubName:string;

    @Column({nullable:true})
    belongToJidae:number;

    @Column({nullable:true})
    belongToJiyeok:number;

    @Column({nullable:true})
    belongToJigu:number;

    @Column({nullable:true})
    imgName:string;
    
    @OneToOne(type => Spon, spon => spon.id, {nullable:true})
    @JoinColumn()
    sponId:number;

    @Column({nullable:true})
    supportCnt:number;

    @Column({nullable:true})
    deviceId:string;

    @Column({nullable:true})
    fcmToken:string;

    @Column({nullable:true})
    belongToClub:number;

    @Column({nullable:true})
    englishName:string;

    @Column({nullable:true})
    memberNo:string;

}