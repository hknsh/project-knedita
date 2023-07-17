import multer from 'multer'
import { Request } from 'express'
import path from 'path'
import s3 from './clients/s3-client'
import multerS3 from 'multer-s3'

const tempFolder = path.resolve(__dirname, '..', '..', 'temp', 'uploads')

const storageTypes = {
  local: multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback) => {
      callback(null, tempFolder)
    },

    filename: (req: Request, file: Express.Multer.File, callback) => {
      /* eslint-disable */
      const folder = req.body.isProfilePicture ? 'profile_images' : 'media'
      const fileName: string = `${folder}/${req.user!.id}.webp`

      callback(null, fileName)
    }
  }),

  s3: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET ?? '',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req: Request, file: Express.Multer.File, callback) => {
      let folder

      if (req.body.isProfilePicture === 'true') {
        folder = 'profile_images'
      } else {
        folder = 'media'
      }

      const fileName: string = `${folder}/${req.user!.id}.jpg`
      callback(null, fileName)
    }
  })
}

const multerConfig = {
  dest: tempFolder,
  storage: storageTypes.s3,
  limits: {
    fileSize: 15 * 1024 * 1024 // 1mb
  },
  fileFilter: (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new Error('Filetype not allowed'))
    }
  },
}

export default multerConfig
