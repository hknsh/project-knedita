import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { File } from "@nest-lab/fastify-multer";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectS3, S3 } from "nestjs-s3";
import sharp from "sharp";
import { Configuration } from "src/configuration";

@Injectable()
export class S3Service {
	constructor(@InjectS3() private readonly s3: S3) {}

	/**
	 * Returns the image url if the upload to minio was successful.
	 */
	async uploadImageToMinio(userID: string, buffer: Buffer): Promise<string> {
		const compressedBuffer = await sharp(buffer)
			.resize(200, 200)
			.webp({ quality: 70 })
			.toBuffer();

		const params: PutObjectCommandInput = {
			Bucket: Configuration.MINIO_DEFAULT_BUCKETS(),
			Key: `profile_images/${userID}.webp`,
			Body: compressedBuffer,
			ContentType: "image/webp",
			ContentDisposition: "inline",
			ACL: "public-read",
		};

		const { ETag } = await this.s3.send(new PutObjectCommand(params));

		if (ETag !== null) {
			return `${Configuration.MINIO_ENDPOINT}/${Configuration.MINIO_DEFAULT_BUCKETS}/profile_images/${userID}.webp`;
		}

		throw new InternalServerErrorException(
			"Failed to upload the profile image",
		);
	}

	async multiImageUploadToMinio(id: string, files: Array<File>) {
		const buffers: Buffer[] = [];

		if (files.length === 0) {
			return [];
		}

		for (let i = 0; i < files.length; i++) {
			const { buffer } = files[i];

			const compressedBuffers = await sharp(buffer)
				.webp({ quality: 70 })
				.toBuffer();
			buffers.push(compressedBuffers);
		}

		const uploadPromises = buffers.map(async (buffer, index) => {
			return await this.multiUploadToMinio(buffer, id, index + 1);
		});

		return Promise.all(uploadPromises);
	}

	private async multiUploadToMinio(buffer: Buffer, id: string, index: number) {
		const Key = `posts/${id}/${index}.webp`;

		const params: PutObjectCommandInput = {
			Bucket: Configuration.MINIO_DEFAULT_BUCKETS(),
			Key,
			Body: buffer,
			ContentType: "image/webp",
		};

		await this.s3.send(new PutObjectCommand(params));
		return `${Configuration.MINIO_ENDPOINT}/${Configuration.MINIO_DEFAULT_BUCKETS}/${Key}`;
	}
}
