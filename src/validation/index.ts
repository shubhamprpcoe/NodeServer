// Generic middleware factory to validate request bodies
import { Request, Response, NextFunction } from "express";
import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import { userSchema } from "./UserSchema.validation";

// Initialize Ajv once
const ajv = new Ajv();
addFormats(ajv);

const validateBody = (schema: JSONSchemaType<any>) => {
  const validate = ajv.compile(schema);
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = validate(req.body);
    if (!valid) return res.status(400).json({ errors: validate.errors });
    next();
  };
};

export { userSchema, validateBody };
