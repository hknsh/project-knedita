import sharp from 'sharp'
import s3 from '../clients/s3-client'
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'

export default async function compressImage (imageName: string): Promise<Error | Object > {
  // Get file from s3
  const { Body } = await s3.send(new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET ?? '',
    Key: imageName
  }))

  const imageBuffer = await Body?.transformToByteArray()

  const compressedImageBuffer = await sharp(imageBuffer)
    .jpeg({ quality: 65 })
    .toBuffer()

  // Send file back
  const params = {
    Bucket: process.env.AWS_BUCKET ?? '',
    Key: imageName,
    Body: compressedImageBuffer,
    ContentType: 'image/jpeg',
    ContentDisposition: 'inline'
  }

  const { ETag } = await s3.send(new PutObjectCommand(params))

  if (ETag !== null) {
    return {}
  } else {
    return new Error('Error while compressing image')
  }
}
