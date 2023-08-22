import { S3Client } from '@aws-sdk/client-s3'
import logger from 'helpers/logger'

let s3: S3Client

if (process.env.NODE_ENV === 'development') {
  logger.info('Using Localstack services instead of AWS.')
  s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
    endpoint: 'http://127.0.0.1:4566', // Uses localstack instead of aws, make sure to create the bucket first with public-read acl
  })
} else {
  s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
  })
}

export default s3
