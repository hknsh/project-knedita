import { File } from "@nest-lab/fastify-multer";
import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

/**
 * Magic Number validation with `file-type` module.
 */
@Injectable()
export class BufferValidator implements PipeTransform {
	async transform(value: File) {
		const { fileTypeFromBuffer } = await (eval(
			'import("file-type")',
		) as Promise<typeof import("file-type")>);

		const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp"];
		const Type = await fileTypeFromBuffer(value.buffer);

		if (!Type || !ALLOWED_MIMES.includes(Type.mime)) {
			throw new BadRequestException(
				"Invalid file type. Should be jpeg, png or webp",
			);
		}

		return value;
	}
}
