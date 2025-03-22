import type { File } from "@nest-lab/fastify-multer";
import {
	BadRequestException,
	Injectable,
	Logger,
	type PipeTransform,
} from "@nestjs/common";
import { loadEsm } from "load-esm";

type FromBufferType = (
	buffer: Buffer,
) => Promise<{ mime: string; ext: string } | undefined>;

@Injectable()
export class MultiFileValidation implements PipeTransform {
	private readonly logger = new Logger(MultiFileValidation.name);
	private readonly ALLOWED_MIMES: string[] = [
		"image/jpeg",
		"image/png",
		"image/webp",
	];
	private readonly MAX_FILE_SIZE: number = 1024 * 1024;

	async transform(files: Array<File>) {
		const validationErrors = await this.validateFiles(files);
		if (validationErrors.length > 0)
			throw new BadRequestException(validationErrors);
		return files;
	}

	private async validateFiles(files: Array<File>) {
		const { fileTypeFromBuffer } =
			await loadEsm<typeof import("file-type")>("file-type");

		const errors = [];
		for (const [index, file] of files.entries()) {
			try {
				await this.validateFileType(fileTypeFromBuffer, file.buffer, index);
				this.validateFileSize(file.size, index);
			} catch (e) {
				errors.push(e.response);
			}
		}
		return errors;
	}

	private async validateFileType(
		fromBuffer: FromBufferType,
		buffer: Buffer,
		index: number,
	) {
		const bufferType = await fromBuffer(buffer);
		this.logger.log(bufferType);
		if (!bufferType || !this.ALLOWED_MIMES.includes(bufferType.mime)) {
			throw new BadRequestException({
				file: index + 1,
				error: "Invalid file type. Should be jpeg, png or webp",
			});
		}
	}

	private validateFileSize(size: number, index: number) {
		if (size > this.MAX_FILE_SIZE) {
			throw new BadRequestException({
				file: index + 1,
				error: "File is too big. Max 1MB",
			});
		}
	}
}
