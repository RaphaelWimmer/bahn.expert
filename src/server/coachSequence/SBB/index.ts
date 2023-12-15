import { fetchSBBCoachSequence } from '#/server/sbb/coachSequence.js';
import { mapSBBCoachSequence } from '#/server/coachSequence/SBB/SBBMapping.js';
import { UpstreamApiRequestMetric } from '#/server/admin/index.js';
import type { CoachSequenceInformation } from '#/types/coachSequence.js';

export async function SBBCoachSequence(
  evaNumber: string,
  trainNumber: string,
  departureTime: Date,
  lastArrivalEva: string,
): Promise<CoachSequenceInformation | undefined> {
  UpstreamApiRequestMetric.inc({
    api: 'coachSequence-SBB',
  });

  const rawSequence = await fetchSBBCoachSequence(
    evaNumber,
    trainNumber,
    departureTime,
    lastArrivalEva,
  );

  return mapSBBCoachSequence(rawSequence);
}
