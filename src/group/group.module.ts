import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jigu, Jiyeok, Jidae, Club } from './entities/group.entity'; 
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { User } from '../user/entities/user.entity';


@Module({
    imports:[TypeOrmModule.forFeature([Jigu, Jiyeok, Jidae, Club, User])],
    controllers: [GroupController],
    providers: [GroupService], 
})
export class GroupModule {}