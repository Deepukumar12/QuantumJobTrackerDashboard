import { config } from "dotenv";
import path from "path";

// Load environment variables from the root .env file dynamically
config({ path: path.resolve(import.meta.dirname, "../../../.env") });

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
