import { File } from "@nest-lab/fastify-multer";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";
import { S3Service } from "src/services/s3/s3.service";
import { UpdateKweekDTO } from "./dto/update-kweek.dto";

@Injectable()
export class KweeksService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly s3: S3Service,
	) {}
	async create(content: string, authorId: string, files: Array<File>) {
    const post = await this.prisma.kweek.create({
      data: {
        content,
        authorId,
      }
    });
    
    const attachments = await this.s3.multiImageUploadToMinio(post.id, files);

    await this.prisma.kweek.updateMany({
      where: {
        id: post.id
      },
      data: {
        attachments
      },
    });

    return await this.prisma.kweek.findUnique({where: {id: post.id}});
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
