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
		) as Promise<typeof import("file-type")>); // TODO: Find a way to remove this eval. This is very dangerous. TOP PRIORITY. <-- Downgrade to 16.5.4 should work.

		const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp"];
		const buffer_type = await fileTypeFromBuffer(value.buffer);

		if (!buffer_type || !ALLOWED_MIMES.includes(buffer_type.mime)) {
			throw new BadRequestException(
				"Invalid file type. Should be jpeg, png or webp",
			);
		}

		return value;
	}
}
