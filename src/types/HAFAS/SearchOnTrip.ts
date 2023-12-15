import type { Common, GenericHafasRequest, ParsedPolyline } from './index.js';
import type { HimIrisMessage } from '#/types/iris.js';
import type { OutConL, SotCtxt } from './TripSearch.js';
import type { RouteJourneySegmentTrain, RouteStop } from '#/types/routing.js';

export interface SearchOnTripResponse {
  common: Common;
  fpB: string;
  fpE: string;
  bfATS: number;
  bflOSTS: number;
  planrtTS: number;
  sotCtxt: SotCtxt;
  outConL: OutConL[];
}

export type AllowedSotMode = 'JI' | 'RC';
interface SearchOnTripJIDRequest {
  jid: string;
  sotMode: 'JI';
}

interface SearchOnTripCTXRequest {
  ctxRecon: string;
  sotMode: 'RC';
}

export interface SearchOnTripRequest
  extends GenericHafasRequest<
    'SearchOnTrip',
    SearchOnTripJIDRequest | SearchOnTripCTXRequest
  > {}

export interface ParsedSearchOnTripResponse extends RouteJourneySegmentTrain {
  himMessages?: HimIrisMessage[];
  currentStop?: RouteStop;
  polyline?: ParsedPolyline;
}
