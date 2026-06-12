import { createApp } from "./app";
import { appConfig } from "./config/app.config";

(async () => {
  try {
    const { server } = await createApp();

    const port = appConfig.port;
    const host = process.platform === "win32" ? "localhost" : "0.0.0.0";

    server.listen(
      { port, host },
      () => {
        console.log(`🚀 [Server] Running at http://${host}:${port} in ${appConfig.nodeEnv} mode`);
      }
    );
  } catch (error) {
    console.error("❌ Failed to start the server:", error);
    process.exit(1);
  }
})();
