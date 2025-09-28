import { Request, Response, NextFunction } from "express";
import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";

// Initialize Ajv once
const ajv = new Ajv();
addFormats(ajv);

// -------------------- Schemas --------------------

// User schema for POST /users
export const userSchema: JSONSchemaType<{ name: string; email: string }> = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" },
  },
  required: ["name", "email"],
  additionalProperties: false,
};
