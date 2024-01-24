import type { Response, Request, NextFunction } from "express";
import multer from "multer";
import multerConfig from "config/multer";
import compressImage from "helpers/compress-image";
import { badRequest } from "helpers/http-errors";

function uploadImage(req: Request, res: Response, next: NextFunction): void {
  const upload = multer(multerConfig).single("image");

  // biome-ignore lint/suspicious/noExplicitAny: i don't know, it's working, no need to change anything here.
  upload(req, res, async (cb: multer.MulterError | Error | any) => {
    if (req.res?.locals.user == null) {
      badRequest(res, "You must be logged in to upload a profile picture");
      return;
    }

    if (cb instanceof multer.MulterError || cb instanceof Error) {
      badRequest(res, cb.message);
      return;
    }

    if (req.file === undefined) {
      badRequest(res, "Expected file");
      return;
    }

    await compressImage(req.file?.key, req.body.isProfilePicture);

    next();
  });
}

export default uploadImage;
