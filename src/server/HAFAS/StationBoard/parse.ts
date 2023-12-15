import { parse } from 'date-fns';
import parseCommonArrival from '../helper/parseCommonArrival.js';
import parseCommonDeparture from '../helper/parseCommonDeparture.js';
import parseMessages from '../helper/parseMessages.js';
import parseStop from '../helper/parseStop.js';
import type {
  CommonArrival,
  CommonDeparture,
  HafasResponse,
  ParsedCommon,
} from '#/types/HAFAS/index.js';
import type { StationBoardEntry } from '#/types/stationBoard.js';
import type {
  StationBoardJny,
  StationBoardResponse,
} from '#/types/HAFAS/StationBoard.js';

const isArrival = (a: CommonArrival | CommonDeparture): a is CommonArrival =>
  a.hasOwnProperty('aOutR');

const parseStationBoardResponse = (
  jny: StationBoardJny,
  common: ParsedCommon,
): StationBoardEntry => {
  const date = parse(jny.date, 'yyyyMMdd', new Date());
  const product = common.prodL[jny.prodX];
  const commonResponse = {
    train: product || {},
    finalDestination: jny.dirTxt,
    jid: jny.jid,
    cancelled: jny.isCncl,
    currentStation: common.locL[jny.stbStop.locX],
    stops: jny.stopL?.map((s) => parseStop(s, common, date, product)),
    messages: parseMessages(jny.msgL, common),
  };

  if (!commonResponse.finalDestination && commonResponse.stops) {
    commonResponse.finalDestination = commonResponse.stops.at(-1)!.station.name;
  }

  if (isArrival(jny.stbStop)) {
    return {
      ...commonResponse,
      arrival: parseCommonArrival(jny.stbStop, date, common),
    };
  }

  return {
    ...commonResponse,
    departure: parseCommonDeparture(jny.stbStop, date, common),
  };
};

export default (
  r: HafasResponse<StationBoardResponse>,
  parsedCommon: ParsedCommon,
): Promise<StationBoardEntry[]> => {
  const abfahrten: StationBoardEntry[] = r.svcResL[0].res.jnyL.map((j) =>
    parseStationBoardResponse(j, parsedCommon),
  );

  return Promise.resolve(abfahrten);
};
