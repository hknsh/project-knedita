import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { KweeksController } from "./kweeks.controller";
import { KweeksService } from "./kweeks.service";

@Module({
	imports: [PrismaModule],
	controllers: [KweeksController],
	providers: [KweeksService],
})
export class KweeksModule {}
