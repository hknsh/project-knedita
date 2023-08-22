/* eslint-disable @typescript-eslint/restrict-template-expressions */
import user from 'services/users'
import type { Request, Response } from 'express'
import { badRequest } from 'helpers/http-errors'
import handleResponse from 'helpers/handle-response'

async function userUploadPictureController (
  req: Request,
  res: Response
): Promise<void> {
  if (req.file === undefined) {
    badRequest(res, 'Expected a JPG or PNG file'); return
  }

  const userId = res.locals.user.id

  let url: string

  if (process.env.NODE_ENV === 'development') {
    url = `http://${process.env.AWS_BUCKET ?? ''}.s3.localhost.localstack.cloud:4566/${req.file.key}`
  } else {
    url = req.file.location
  }

  const result = await user.uploadPicture(userId, url)

  handleResponse(res, result)
}

export default userUploadPictureController
