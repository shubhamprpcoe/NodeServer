import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import rateLimit from "express-rate-limit";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import cookiesParser from "cookie-parser";
import YAML from "yamljs";

import { globalErrorHandler, globalResponseHandler } from "@middlewares";
import { initTelemetry } from "./telemetry/opentelemetry";
import { userRoutes } from "@routes";
import { config } from "@config";
import logger from "@logger";
import { customError } from "@utils";
initTelemetry();

const app: Application = express();
const ajv = new Ajv();
addFormats(ajv);

// Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));

if (config.nodeEnv !== "production") {
  app.use(morgan("dev"));
}
// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, try later",
  })
);

// Routes
app.get("/health", (req, res, next) => {
  try {
    globalResponseHandler.sendSuccess(res, req, null, "Service is healthy");
  } catch {
    const error = new customError("Service is unhealthy", 503);
    error.statusCode = 503;
    next(error);
  }
});

// user route
app.use("/api/v1/users", userRoutes);

// common route not found handler
app.use((req, res, next) => {
  const error = new customError("Route not found", 404);
  error.statusCode = 404;
  next(error);
});

// Swagger
const swaggerDocument = YAML.load("./src/swagger/swagger.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error Handler
app.use(globalErrorHandler);

try {
  app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
  });
} catch (err) {
  logger.error("Fatal error: Serever stop", err);
  process.exit(1);
}
