import { asyncErrHandlerWrapper } from "@/utils";
import { Request, Response, NextFunction } from "express";

export const getUsers = asyncErrHandlerWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
      ];
      res.json({ success: true, data: users });
    } catch (err) {
      next(err);
    }
  }
);
