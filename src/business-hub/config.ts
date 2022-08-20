import { Configuration as RisJourneysConfiguration } from 'business-hub/generated/risJourneys';
import { Configuration as RisStationsConfiguration } from 'business-hub/generated/risStations';

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

export const risJourneysConfiguration = new RisJourneysConfiguration({
  basePath: process.env.RIS_JOURNEYS_URL,
  baseOptions: {
    headers: {
      'DB-Api-Key': process.env.RIS_JOURNEYS_CLIENT_SECRET,
      'DB-Client-Id': process.env.RIS_JOURNEYS_CLIENT_ID,
    },
  },
});