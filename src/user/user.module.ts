import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from 'src/group/entities/group.entity';
import { Support } from '../spon/entities/support.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports:[TypeOrmModule.forFeature([User, Support, Club])],
    controllers: [UserController],
    providers: [UserService], 
})
export class UserModule {}