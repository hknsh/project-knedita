import comment from "services/comments";
import type { Request, Response } from "express";
import { badRequest } from "helpers/http-errors";
import handleResponse from "helpers/handle-response";

async function commentDeleteController(
  req: Request,
  res: Response
): Promise<void> {
  const { commentId } = req.body;
  const id = res.locals.user.id;

  if (commentId === undefined) {
    badRequest(res, "Expected comment id");
    return;
  }

  const result = await comment.delete(commentId, id);

  handleResponse(res, result);
}

export default commentDeleteController;
