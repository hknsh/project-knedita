import { Module } from "@nestjs/common";
import { KweeksService } from "./kweeks.service";
import { KweeksController } from "./kweeks.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [KweeksController],
  providers: [KweeksService],
})
export class KweeksModule {}
