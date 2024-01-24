import { type Response } from "express";
import { badRequest } from "./http-errors";

// biome-ignore lint/suspicious/noExplicitAny: don't question it.
export default function handleResponse(res: Response, result: any): void {
  if (result instanceof Error) {
    badRequest(res, result.message);
  } else {
    res.json(result);
  }
}
