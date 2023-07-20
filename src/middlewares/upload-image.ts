/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Response, Request, NextFunction } from 'express'
import multer from 'multer'
import multerConfig from '../config/multer'
import compressImage from '../lib/compress-image'
import { badRequest } from '../lib/http-errors'

function uploadImage (req: Request, res: Response, next: NextFunction) {
  const upload = multer(multerConfig).single('image')

  upload(req, res, async (cb: multer.MulterError | Error | any) => {
    if (req.user == null) {
      return badRequest(res, 'You must be logged in to upload a profile picture')
    }

    if (cb instanceof multer.MulterError || cb instanceof Error) {
      return badRequest(res, cb.message)
    }

    // @ts-expect-error property `key` does not exists in types
    await compressImage(req.file?.key)

    next()
  })
}

export default uploadImage
