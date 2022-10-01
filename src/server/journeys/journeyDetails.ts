import { calculateCurrentStopPlace } from 'server/HAFAS/Detail';
import { differenceInMinutes, parseISO, subMinutes } from 'date-fns';
import { EventType } from 'business-hub/generated/risJourneys';
import { getAbfahrten } from 'server/iris';
import { getJourneyDetails } from 'business-hub/risJourneys';
import type { ArrivalDepartureEvent } from 'business-hub/generated/risJourneys';
import type { CommonStopInfo } from 'types/HAFAS';
import type { ParsedSearchOnTripResponse } from 'types/HAFAS/SearchOnTrip';
import type { Route$Stop } from 'types/routing';

const trainNumberRegex = /(.*?)(\d+).*/;

export async function addIrisMessagesToDetails(
  details: ParsedSearchOnTripResponse,
): Promise<void> {
  const irisStop =
    details.currentStop || details.stops[details.stops.length - 1];

  if (irisStop) {
    const stopInfo = irisStop.departure || irisStop.arrival;

    if (stopInfo) {
      try {
        const irisData = await getAbfahrten(irisStop.station.id, false, {
          lookahead: 10,
          lookbehind: 0,
          currentDate: subMinutes(stopInfo.scheduledTime, 5),
        });

        const irisDeparture = irisData.departures.find(
          (a) => a.train.name === details.train.name,
        );

        if (irisDeparture) {
          const irisMessages = [
            ...irisDeparture.messages.delay,
            ...irisDeparture.messages.qos,
            ...irisDeparture.messages.him,
          ];
          irisStop.irisMessages = irisMessages;
        }
      } catch {
        // ignore
      }
    }
  }
}

export function getCategoryAndNumberFromName(trainName: string):
  | {
      trainNumber: number;
      category?: string;
    }
  | undefined {
  const regexResult = trainNumberRegex.exec(trainName);
  const trainNumber = Number.parseInt(regexResult?.[2].trim() || '');
  const category = regexResult?.[1]?.trim();

  if (!Number.isNaN(trainNumber)) {
    return {
      trainNumber,
      category: category?.length ? category : undefined,
    };
  }
}

interface StopInfoWithAdditional extends CommonStopInfo {
  additional?: boolean;
}

function mapEventToCommonStopInfo(
  e: ArrivalDepartureEvent,
): StopInfoWithAdditional {
  const scheduledTime = parseISO(e.timeSchedule);
  const time = parseISO(e.time);
  const delay = differenceInMinutes(time, scheduledTime);

  return {
    scheduledTime,
    time,
    cancelled: e.canceled,
    additional: e.additional,
    delay,
    scheduledPlatform: e.platformSchedule,
    platform: e.platform,
  };
}

interface JourneyStop extends Route$Stop {
  arrival?: StopInfoWithAdditional;
  departure?: StopInfoWithAdditional;
}

function stopsFromEvents(events: ArrivalDepartureEvent[]) {
  const stops: JourneyStop[] = [];
  for (const e of events) {
    const possibleStops = stops.filter(
      (s) => s.station.id === e.station.evaNumber,
    );
    let stop = possibleStops.length
      ? possibleStops[possibleStops.length - 1]
      : undefined;

    if (!stop || (stop.arrival && stop.departure)) {
      stop = {
        station: {
          id: e.station.evaNumber,
          title: e.station.name,
        },
      };
      stops.push(stop);
    }

    const stopInfo = mapEventToCommonStopInfo(e);
    stop[e.type === EventType.Arrival ? 'arrival' : 'departure'] = stopInfo;
  }

  for (const s of stops) {
    if (
      (s.arrival?.cancelled || !s.arrival) &&
      (s.departure?.cancelled || !s.departure)
    ) {
      s.cancelled = true;
    }
    if (
      (s.arrival?.additional || !s.arrival) &&
      (s.departure?.additional || !s.departure)
    ) {
      s.additional = true;
    }
  }

  return stops;
}

export async function journeyDetails(
  jounreyId: string,
): Promise<ParsedSearchOnTripResponse | undefined> {
  const journey = await getJourneyDetails(jounreyId);
  if (!journey) {
    return undefined;
  }
  if (!journey.events.length) {
    return undefined;
  }
  const firstEvent = journey.events[0];
  const stops = stopsFromEvents(journey.events);
  if (!stops.length) {
    return undefined;
  }
  const firstStop = stops[0];
  const lastStop = stops[stops.length - 1];

  const operatorNames = [
    ...new Set(journey.events.map((e) => e.administration.operatorName)),
  ].join(', ');

  const result: ParsedSearchOnTripResponse = {
    stops,
    segmentStart: firstStop.station,
    segmentDestination: lastStop.station,
    jid: journey.journeyID,
    arrival: lastStop.arrival!,
    departure: firstStop.departure!,
    finalDestination: journey.destinationSchedule.name,
    train: {
      type: firstEvent.transport.category,
      number: firstEvent.transport.number.toString(),
      name: `${firstEvent.transport.category} ${
        firstEvent.transport.line || firstEvent.transport.number
      }`,
      admin: firstEvent.administration.administrationID,
      operator: {
        name: operatorNames,
        icoX: 0,
      },
    },
    type: 'JNY',
    cancelled: stops.every((s) => s.cancelled),
  };

  result.currentStop = calculateCurrentStopPlace(result);

  await addIrisMessagesToDetails(result);

  return result;
}