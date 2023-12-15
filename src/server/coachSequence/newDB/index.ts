import { getDepartureSequence } from '#/server/external/coachSequence.js';
import { mapInformation } from '#/server/coachSequence/newDB/newDBMapping.js';
import type { CoachSequenceInformation } from '#/types/coachSequence.js';

const isDisabled = process.env.COACH_SEQUENCE_DISABLED
  ? JSON.parse(process.env.COACH_SEQUENCE_DISABLED)
  : false;

export async function newDBCoachSequence(
  trainCategory: string,
  trainNumber: number,
  evaNumber: string,
  plannedDepartureDate: Date,
  initialDepartureDate: Date,
): Promise<CoachSequenceInformation | undefined> {
  if (isDisabled) {
    return undefined;
  }
  const sequence = await getDepartureSequence(
    trainCategory,
    trainNumber,
    evaNumber,
    plannedDepartureDate,
    initialDepartureDate,
  );

  const mappedSequence = mapInformation(
    sequence,
    trainCategory,
    trainNumber,
    evaNumber,
  );
  return mappedSequence;
}
