import { Module } from '@nestjs/common';
import { KweeksService } from './kweeks.service';
import { KweeksController } from './kweeks.controller';

@Module({
  controllers: [KweeksController],
  providers: [KweeksService],
})
export class KweeksModule {}
