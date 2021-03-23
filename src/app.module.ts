import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Admin } from './admin/entities/admin.entity';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { CommonModule } from './common/common.module';
import { GroupModule} from './group/group.module';
import { Jigu, Jiyeok, Jidae, Club } from './group/entities/group.entity';
import { SponModule } from './spon/spon.module';
import { Spon } from './spon/entities/spon.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "shsbsy70",
      "database": "lions",
      "synchronize": true,
      "logging": false,
      "entities":[User, Admin, Jigu, Jiyeok, Jidae, Club, Spon],
    }),
    // GraphQLModule.forRoot({autoSchemaFile: 'schema.gql', playground:true}),
    UserModule,
    AdminModule,
    CommonModule,
    GroupModule,
    SponModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
