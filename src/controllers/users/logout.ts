import type { Request, Response } from 'express'

async function userLogoutController(
  req: Request,
  res: Response,
): Promise<void> {
  // @ts-expect-error clearCookie interface does not exists in Response.
  return res
    .clearCookie('knedita_token')
    .status(200)
    .json({ message: 'Successfully logged out' })
}

export default userLogoutController
