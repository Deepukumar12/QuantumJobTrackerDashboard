// Database configuration placeholder for future production DB integration
import { appConfig } from "./app.config";

export const dbConfig = {
  url: appConfig.databaseUrl,
  isProvisioned: !!appConfig.databaseUrl,
};
