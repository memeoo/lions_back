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

    @Column()
    belongTo:string;
}

@Entity()
export class Jidae extends CoreEntity{

    @Column()
    name:string;

    @Column()
    belongTo:string;

}

@Entity()
export class Club extends CoreEntity{

    @Column()
    name:string;

    @Column()
    belongTo:string;

}