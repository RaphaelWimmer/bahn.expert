/* eslint-disable unicorn/prefer-module */
import { disconnectRedis } from '#/server/cache.js';
import { expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';

expect(new Date().getTimezoneOffset()).toBe(0);

const isoDateRegex =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}\.\d*)(?:Z|([+-])([\d:|]*))?$/;
globalThis.parseJson = (json: string) => {
  try {
    return JSON.parse(json, (_key, value) => {
      if (typeof value === 'string' && isoDateRegex.test(value)) {
        return new Date(value);
      }
      return value;
    });
  } catch {
    return json;
    // Ignoring
  }
};

beforeAll(() => {
  globalThis.mockServer = setupServer();
  globalThis.mockServer.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => {
  globalThis.mockServer.close();
  disconnectRedis();
});

afterEach(() => globalThis.mockServer.resetHandlers());
