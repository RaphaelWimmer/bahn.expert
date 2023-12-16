import { http, HttpResponse } from 'msw';

const emptyTimetable = '<timetable station="empty"></timetable>';

const baseStopPlace = {
  evaNumber: '8000105',
  stationID: '1866',
  names: {
    DE: {
      nameLong: 'Frankfurt(Main)Hbf',
      speechLong: 'Frankfurt am Main Hbf',
      speechShort: 'Frankfurt Hbf',
      synonyms: ['Francfort (Main)'],
    },
  },
  metropolis: { DE: 'Frankfurt am Main' },
  availableTransports: [
    'REGIONAL_TRAIN',
    'HIGH_SPEED_TRAIN',
    'CITY_TRAIN',
    'INTER_REGIONAL_TRAIN',
    'INTERCITY_TRAIN',
  ],
  transportAssociations: ['RMV'],
  countryCode: 'DE',
  state: 'HE',
  municipalityKey: '06412000',
  timeZone: 'Europe/Berlin',
  position: { longitude: 8.663789, latitude: 50.107145 },
};

const baseKeys = [
  { type: 'IFOPT', key: 'de:06412:10' },
  { type: 'RL100', key: 'FF' },
  { type: 'EPA', key: '8060315' },
  { type: 'STADA', key: '1866' },
  { type: 'IBNR', key: '00105' },
  { type: 'EBHF', key: '08000105' },
  { type: 'UIC', key: '8011068' },
  { type: 'PLC', key: 'DE13276' },
];

function mockStopPlaceKeys(evaNumber: string) {
  globalThis.mockServer.use(
    http.get(
      `https://apis.deutschebahn.com/db-api-marketplace/apis/ris-stations/v1/stop-places/${evaNumber}/keys`,
      () =>
        HttpResponse.json({
          keys: [...baseKeys, { type: 'EVA', key: evaNumber }],
        }),
    ),
  );
}

export function mockStopPlaceByEva(
  evaNumber: string,
  stopPlaceOverrides?: Partial<typeof baseStopPlace>,
): void {
  mockStopPlaceKeys(evaNumber);
  globalThis.mockServer.use(
    http.get(
      `https://apis.deutschebahn.com/db-api-marketplace/apis/ris-stations/v1/stop-places/${evaNumber}`,
      () =>
        HttpResponse.json({
          stopPlaces: [
            {
              ...baseStopPlace,
              ...stopPlaceOverrides,
              evaNumber,
            },
          ],
        }),
    ),
  );
}

export function mockLageplan(eva: string, stationId: string): void {
  mockStopPlaceByEva(eva, {
    stationID: stationId,
  });
  globalThis.mockServer.use(
    http.get(
      `https://www.bahnhof.de/downloads/station-plans/${stationId}.pdf`,
      () => new HttpResponse(),
    ),
  );
}

export function mockSearch(
  count: number,
  results: string[],
  startTime = 11,
): void {
  for (let i = 0; i <= count; i += 1) {
    const hour = startTime + i;

    globalThis.mockServer.use(
      http.get(`http://iris.dummy/plan/test/190317/${hour}`, () =>
        HttpResponse.xml(results[i] || emptyTimetable),
      ),
    );
  }
}

export function mockFchg(result: string = emptyTimetable): void {
  globalThis.mockServer.use(
    http.get(`http://iris.dummy/fchg/test`, () => HttpResponse.xml(result)),
  );
}

export function mockAllStations(): void {
  globalThis.mockServer.use(
    http.get(/http:\/\/iris\.dummy\/station\/.*/, () =>
      HttpResponse.xml('<stations></stations>'),
    ),
  );
}
