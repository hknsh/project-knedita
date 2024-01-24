import post from "services/posts";
import type { Request, Response } from "express";
import { badRequest } from "helpers/http-errors";
import handleResponse from "helpers/handle-response";

async function postFetchInfoController(
  req: Request,
  res: Response
): Promise<void> {
  const id = req.query.id as string;

  if (id === undefined) {
    badRequest(res, "Missing post id");
    return;
  }

  const result = await post.fetch(id);

  handleResponse(res, result);
}

export default postFetchInfoController;
