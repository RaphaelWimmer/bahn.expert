import type { StopPlaceGroupType } from '#/server/external/generated/risStations/index.js';

export * from './generated/risStations/api.js';

export type ResolvedStopPlaceGroups = Partial<
  Record<StopPlaceGroupType, string[]>
>;
