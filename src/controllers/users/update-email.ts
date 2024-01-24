import user from "services/users";
import type { Request, Response } from "express";
import handleResponse from "helpers/handle-response";

async function userUpdateEmailController(
  req: Request,
  res: Response
): Promise<void> {
  const { email } = req.body;
  const id = res.locals.user.id;

  const result = await user.updateEmail({ id, email });

  handleResponse(res, result);
}

export default userUpdateEmailController;
