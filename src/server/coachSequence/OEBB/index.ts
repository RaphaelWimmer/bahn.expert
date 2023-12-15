import { info } from '#/server/oebb/index.js';
import { mapInformation } from '#/server/coachSequence/OEBB/OEBBMapping.js';
import { UpstreamApiRequestMetric } from '#/server/admin/index.js';
import type { CoachSequenceInformation } from '#/types/coachSequence.js';

export async function OEBBCoachSequence(
  trainNumber: string,
  evaNumber: string,
  initialDeparture: Date,
): Promise<CoachSequenceInformation | undefined> {
  UpstreamApiRequestMetric.inc({
    api: 'coachSequence-OEBB',
  });
  const rawSequence = await info(
    Number.parseInt(trainNumber),
    evaNumber,
    initialDeparture,
  );

  return mapInformation(rawSequence);
}
