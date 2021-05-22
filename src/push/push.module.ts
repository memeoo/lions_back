import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin'
import * as admin from 'firebase-admin'
import { PushController } from './push.controller';
import { PushService } from './push.service';
const serviceAccount = require('../../src/lions.json');


@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://lions-3cc45.firebaseio.com'
      })
    }),
  ],
  controllers: [PushController],
  providers: [PushService]
})  

export class PushModule {}