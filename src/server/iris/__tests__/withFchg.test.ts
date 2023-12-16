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
import { vi, describe, beforeAll, afterAll, it, expect } from 'vitest';

vi.mock('#/server/cache.js');

describe('withFchg', () => {
  beforeAll(() => {
    vi.useFakeTimers({
      shouldAdvanceTime: true,
      now: 1552824000000,
    });
  });
  afterAll(() => {
    vi.useRealTimers();
  });
  const baseFixturePath = '__fixtures__';
  const fchgFixtures = fs.readdirSync(
    path.resolve(__dirname, baseFixturePath, 'fchg'),
  );

  for (const file of fchgFixtures) {
    it(file, async () => {
      const fchgXml = fs.readFileSync(
        path.resolve(__dirname, baseFixturePath, 'fchg', file),
        'utf8',
      );
      const planxml = fs.readFileSync(
        path.resolve(__dirname, baseFixturePath, 'plan', file),
        'utf8',
      );

      mockFchg(fchgXml);
      mockSearch(3, ['', planxml]);
      mockAllStations();
      const timetable = new Timetable('test', 'test', {
        lookahead: 120,
        lookbehind: 60,
      });

      await expect(timetable.start()).resolves.toMatchSnapshot();
    });
  }
});
