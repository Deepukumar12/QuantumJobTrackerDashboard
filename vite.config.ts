import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@/lib/utils": path.resolve(import.meta.dirname, "frontend/src/lib/ui.helper.ts"),
      "@/lib/queryClient": path.resolve(import.meta.dirname, "frontend/src/utils/query-client.ts"),
      "@/lib/export": path.resolve(import.meta.dirname, "frontend/src/lib/export.helper.ts"),
      "@/lib/job-simulator": path.resolve(import.meta.dirname, "frontend/src/lib/job-simulator.helper.ts"),
      "@/data/quizData": path.resolve(import.meta.dirname, "shared/constants/quiz-data.constants.ts"),
      "@": path.resolve(import.meta.dirname, "frontend/src"),
      "@shared/schema": path.resolve(import.meta.dirname, "shared/schemas/schema.ts"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "frontend/src/assets"),
      "@admin": path.resolve(import.meta.dirname, "admin"),
    },
  },
  root: path.resolve(import.meta.dirname, "frontend"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
