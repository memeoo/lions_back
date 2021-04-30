import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity} from "typeorm";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";

@Entity()
export class Admin extends CoreEntity{

    @Column()
    mId:string;

    @Column()
    pass:string;

    @Column()
    mobile:string;

    @Column({nullable:true})
    email:string;

    @Column({nullable:true})
    club:number;

    @Column({nullable:true})
    jidae:number;

    @Column({nullable:true})
    jiyeok:number;

    @Column({nullable:true})
    jigu:number;

    @Column({nullable:true, default:false})
    isConfirmed:boolean;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() : Promise<void>{
        if(this.pass){
            try{
                this.pass = await bcrypt.hash(this.pass, 5); 
            }catch(e){
                console.log(e);
                throw new InternalServerErrorException();
            }
        }
    }

    async checkPassword(aPassword: string) : Promise<boolean>{
        try{
            const ok = await bcrypt.compare(aPassword, this.pass);
            return ok;
        }catch(e){
            console.log(e);
            throw new InternalServerErrorException();
        }
    }



}