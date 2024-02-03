import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateKweekDTO } from "./dto/create-kweek.dto";
import { UpdateKweekDTO } from "./dto/update-kweek.dto";

@Injectable()
export class KweeksService {
	constructor(private readonly prisma: PrismaService) {}
	create(createKweekDto: CreateKweekDTO) {
		return "This action adds a new kweek";
	}

	findOne(id: number) {
		return `This action returns a #${id} kweek`;
	}

	update(id: number, updateKweekDto: UpdateKweekDTO) {
		return `This action updates a #${id} kweek`;
	}

	remove(id: number) {
		return `This action removes a #${id} kweek`;
	}
}
