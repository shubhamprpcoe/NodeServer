import { Router } from "express";
import { getUsers } from "@controllers";
import { RequestHandler } from "express";

import { userSchema, validateBody } from "@validation";

export const userRoutes = Router();
userRoutes.get("/", getUsers as unknown as RequestHandler);
