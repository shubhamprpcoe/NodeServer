import { Request, Response } from "express";
import { ResponseMeta, ApiResponse } from "@types";

const generateRequestId = (): string =>
  Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

const createBaseResponse = (
  req: Request,
  statusCode: number,
  message: string
): Omit<ApiResponse, "data" | "meta"> => ({
  success: true,
  statusCode,
  message,
  timestamp: new Date().toISOString(),
  path: req.originalUrl || req.path,
  requestId: (req.headers["x-request-id"] as string) || generateRequestId(),
});

export const sendSuccess = <T = any>(
  res: Response,
  req: Request,
  data?: T,
  message = "Success",
  statusCode = 200,
  meta?: ResponseMeta
): Response<ApiResponse<T>> => {
  const response: ApiResponse<T> = {
    ...createBaseResponse(req, statusCode, message),
    data,
    meta,
  };

  return res.status(statusCode).json(response);
};

export const globalResponseHandler = { sendSuccess };
