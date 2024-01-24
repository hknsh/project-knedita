import user from "services/users";
import type { Request, Response } from "express";
import handleResponse from "helpers/handle-response";

async function userSignupController(
  req: Request,
  res: Response
): Promise<void> {
  const { username, email, password } = req.body;

  const result = await user.signup({ username, email, password });

  handleResponse(res, result);
}

export default userSignupController;
