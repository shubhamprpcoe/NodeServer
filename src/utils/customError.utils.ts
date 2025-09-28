import { Errback, NextFunction, Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export class customError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    // attaches proper stack trace starting from this class
    Error.captureStackTrace(this, this.constructor);

    // fix prototype chain (so instanceof checks work correctly)
    Object.setPrototypeOf(this, customError.prototype);
  }
}

export const asyncErrHandlerWrapper = (cb: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    cb(req, res, next).catch((err: Errback) => next(err));
  };
};
