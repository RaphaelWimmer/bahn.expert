import { describe, expect, it, vi } from 'vitest';
import { getDBLageplan } from '#/server/StopPlace/Lageplan/DBLageplan.js';
import { mockLageplan } from '#/server/__tests__/mockHelper.js';

vi.mock('#/server/cache.js');

describe('DB Lageplan', () => {
  it('Finds lageplan for Eva', async () => {
    mockLageplan('8000105', 'testing');
    const foundLageplan = await getDBLageplan('8000105');

    expect(foundLageplan).toContain('testing.pdf');
  });
});
