import { Configuration as CoachSequenceConfiguration } from '#/server/external/generated/coachSequence/index.js';
import { Configuration as RisJourneysConfiguration } from '#/server/external/generated/risJourneys/index.js';
import { Configuration as RisStationsConfiguration } from '#/server/external/generated/risStations/index.js';

export const risStationsConfiguration = new RisStationsConfiguration({
  basePath: process.env.RIS_STATIONS_URL,
  baseOptions: {
    headers: {
      'user-agent': process.env.USER_AGENT || 'bahnhofs-abfahrten-default',
      'DB-Api-Key': process.env.RIS_STATIONS_CLIENT_SECRET,
      'DB-Client-Id': process.env.RIS_STATIONS_CLIENT_ID,
    },
  },
});

export const getRisJourneysConfiguration = (
  clientId: string,
  clientSecret: string,
): RisJourneysConfiguration =>
  new RisJourneysConfiguration({
    basePath: process.env.RIS_JOURNEYS_URL,
    baseOptions: {
      headers: {
        'DB-Api-Key': clientSecret,
        'DB-Client-Id': clientId,
      },
    },
  });

export const coachSequenceConfiguration = new CoachSequenceConfiguration({
  basePath: process.env.COACH_SEQUENCE_URL,
  baseOptions: {
    headers: {
      'DB-Api-Key': process.env.COACH_SEQUENCE_CLIENT_SECRET,
      'DB-Client-Id': process.env.COACH_SEQUENCE_CLIENT_ID,
    },
  },
});
