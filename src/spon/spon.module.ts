import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spon } from './entities/spon.entity';
import { SponController } from './spon.controller';
import { SponService } from './spon.service';

@Module({
  imports:[TypeOrmModule.forFeature([Spon])],  
  controllers: [SponController],
  providers: [SponService]
})
export class SponModule {}
