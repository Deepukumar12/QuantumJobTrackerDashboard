import type { IncomingMessage, ServerResponse } from "http";
import { createApp } from "../backend/src/app";

let appInstance: any = null;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!appInstance) {
    const { app } = await createApp();
    appInstance = app;
  }
  return appInstance(req, res);
}
