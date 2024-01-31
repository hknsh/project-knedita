import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectS3, S3 } from "nestjs-s3";
import sharp from "sharp";

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

    const uploadParams: PutObjectCommandInput = {
      Bucket: process.env.MINIO_DEFAULT_BUCKETS,
      Key: `profile_images/${userID}.webp`,
      Body: compressedBuffer,
      ContentType: "image/webp",
      ContentDisposition: "inline",
      ACL: "public-read",
    };

    const { ETag } = await this.s3.send(new PutObjectCommand(uploadParams));

    if (ETag !== null) {
      return `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_DEFAULT_BUCKETS}/profile_images/${userID}.webp`;
    }

    throw new InternalServerErrorException(
      "Failed to upload the profile image",
    );
  }
}
