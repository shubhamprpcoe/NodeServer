import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import logger from "../logger";

export const initTelemetry = () => {
  const sdk = new NodeSDK({
    traceExporter: undefined, // Add exporters: OTLP, Jaeger, etc.
    metricReader: undefined, // Optional metrics
    instrumentations: [getNodeAutoInstrumentations()],
  });

  try {
    sdk.start();
    logger.info("OpenTelemetry initialized");
  } catch (err: unknown) {
    logger.error("OpenTelemetry init failed", err);
  }
};
