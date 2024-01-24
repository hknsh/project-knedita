import user from "services/users";
import type { Request, Response } from "express";
import handleResponse from "helpers/handle-response";

async function userAuthController(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  const result = await user.auth({ email, password });

  handleResponse(res, result);
}

export default userAuthController;
