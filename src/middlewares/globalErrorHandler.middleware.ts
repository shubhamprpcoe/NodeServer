import { Request, Response, NextFunction } from "express";
import logger from "@logger";
import { config } from "@config";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack);
  err.statusCode = err.statusCode || 500;

  if (config.nodeEnv === "development") {
    res.status(err?.statusCode || 500).json({
      success: false,
      status: err?.statusCode,
      message: err.message || "Internal Server Error",
      error: err,
      stackTrace: err?.stack,
    });
  } else if (config.nodeEnv === "production") {
    if (err.isOperational === true) {
      res.status(err?.statusCode || 500).json({
        success: false,
        status: err?.statusCode,
        message: err.message || "Internal Server Error",
      });
    } else {
      res.status(err?.statusCode || 500).json({
        success: false,
        status: err?.statusCode,
        message: "Internal Server Error",
      });
    }
  }
};
