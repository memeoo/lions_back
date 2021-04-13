import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "src/common/entities/core.entity";

@Entity()
export class Jigu extends CoreEntity{
    @Column()
    name:string;
}

@Entity()
export class Jiyeok extends CoreEntity{

    @Column()
    name:string;

    @Column({nullable:true})
    belongTo:number;
}

@Entity()
export class Jidae extends CoreEntity{

    @Column()
    name:string;

    @Column({nullable:true})
    belongTo:number;

}

@Entity()
export class Club extends CoreEntity{

    @Column()
    name:string;

    @Column({nullable:true})
    belongTo:number;

    @Column({nullable:true})
    startDay:string;

    @Column({nullable:true})
    jiguNo:string;

    @Column({nullable:true})
    gukjeNo:string;

    @Column({nullable:true})
    sponsorClub:number;

    @Column({nullable:true})
    address:string;

    @Column({nullable:true})
    tel:string;

    @Column({nullable:true})
    fax:string;

    @Column({nullable:true})
    homepage:string;

    @Column({nullable:true})
    email:string;

    @Column({nullable:true})
    slogan:string;

    @Column({nullable:true})
    clubOnly:string;

}