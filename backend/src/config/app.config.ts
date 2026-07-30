import { config } from "dotenv";
import path from "path";

// In production (Railway/cloud), env vars are injected directly into process.env.
// Only attempt to load .env file in development to avoid errors on missing file.
if (process.env.NODE_ENV !== "production") {
  config({ path: path.resolve(import.meta.dirname, "../../../.env") });
}

export const appConfig = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL || "",
  ibmQuantum: {
    apiToken: process.env.IBM_QUANTUM_API_TOKEN || "",
    region: process.env.IBM_QUANTUM_REGION || "us-east",
    projectId: process.env.IBM_QUANTUM_PROJECT_ID || "",
    instanceId: process.env.IBM_QUANTUM_INSTANCE_ID || "",
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || "",
  },
  sessionSecret: process.env.SESSION_SECRET || "quantum-dashboard-default-secret",
};
