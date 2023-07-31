/* eslint-disable @typescript-eslint/restrict-template-expressions */
import user from 'services/users'
import type { Request, Response } from 'express'
import { badRequest } from 'lib/http-errors'

let url

async function userUploadPictureController (
  req: Request,
  res: Response
): Promise<void> {
  if (req.file === undefined) {
    badRequest(res, 'Expected a JPG or PNG file'); return
  }

  const userId = req.user?.id ?? ''

  if (process.env.NODE_ENV === 'development') {
    // @ts-expect-error property `key` doesn't exists in @types/express
    url = `http://${process.env.AWS_BUCKET ?? ''}.s3.localhost.localstack.cloud:4566/${req.file.key}`
  } else {
    // @ts-expect-error property `location` doesn't exists in @types/express
    url = req.file.location
  }

  const result = await user.uploadPicture(userId, url)

  if (result instanceof Error) {
    badRequest(res, result.message); return
  }

  res.json(result)
}

export default userUploadPictureController
