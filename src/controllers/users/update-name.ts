import user from "services/users";
import type { Request, Response } from "express";
import handleResponse from "helpers/handle-response";

async function userUpdateNameController(
  req: Request,
  res: Response
): Promise<void> {
  const { displayName, username } = req.body;
  const id = res.locals.user.id;

  const result = await user.updateName({ id, displayName, username });

  handleResponse(res, result);
}

export default userUpdateNameController;
