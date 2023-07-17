/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Response, Request, NextFunction } from 'express'
import multer from 'multer'
import multerConfig from '../config/multer'
import compressImage from '../lib/compress-image'

function uploadImage (req: Request, res: Response, next: NextFunction) {
  const upload = multer(multerConfig).single('image')

  upload(req, res, async (cb: multer.MulterError | Error | any) => {
    if (req.user == null) {
      return res.status(400).json({
        error: 'You must be logged in to upload a profile picture'
      })
    }

    if (cb instanceof multer.MulterError || cb instanceof Error) {
      return res.status(400).json({
        error: cb.message
      })
    }

    // @ts-expect-error property `key` does not exists in types
    const compressed = await compressImage(req.file?.key)

    if (compressed instanceof Error) {
      return res.status(500).json({
        error: compressed.message
      })
    }

    next()
  })
}

export default uploadImage
