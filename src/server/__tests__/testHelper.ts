import { afterAll } from 'vitest';
import { createApp } from '#/server/app.js';
import type { Server } from 'node:http';

export async function createTestServer(): Promise<Server> {
  const app = await createApp();
  const server = app.listen();

  afterAll(() => {
    server.close();
  });

  return server;
}
