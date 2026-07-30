import type { Request, Response } from "express";

export function getHealthStatus(req: Request, res: Response) {
  const memoryUsage = process.memoryUsage();
  const uptime = process.uptime();
  
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptime)}s`,
    process: {
      pid: process.pid,
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      },
      cpu: process.cpuUsage(),
    },
    services: {
      database: "connected (in-memory emulation)",
      ibmQuantum: "online (simulated/direct sync)",
    }
  });
}
