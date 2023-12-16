/* eslint-disable unicorn/prefer-module */
/* eslint no-sync: 0 */
import {
  mockAllStations,
  mockFchg,
  mockSearch,
} from '#/server/__tests__/mockHelper.js';
import { Timetable } from '#/server/iris/Timetable.js';
import fs from 'node:fs';
import path from 'node:path';
import { describe, beforeAll, afterAll, it, expect, vi } from 'vitest';

vi.mock('#/server/cache.js');

describe('onlyPlan', () => {
  beforeAll(() => {
    vi.useFakeTimers({
      shouldAdvanceTime: true,
      now: 1552824000000,
    });
  });
  afterAll(() => {
    vi.useRealTimers();
  });
  const baseFixturePath = '__fixtures__/plan';
  const fixtures = fs.readdirSync(path.resolve(__dirname, baseFixturePath));

  for (const file of fixtures) {
    it(file, async () => {
      const inXml = fs.readFileSync(
        path.resolve(__dirname, baseFixturePath, file),
        'utf8',
      );

      mockFchg();
      mockSearch(4, ['', inXml]);
      mockAllStations();
      const timetable = new Timetable('test', 'test', {
        lookahead: 120,
        lookbehind: 60,
      });

      await expect(timetable.start()).resolves.toMatchSnapshot();
    });
  }
});
