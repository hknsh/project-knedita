import * as express from "express";

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        location: string;
        key: string;
      }
    }
  }
}
