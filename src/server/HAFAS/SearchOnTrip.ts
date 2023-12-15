import { Journey } from './TripSearch/parse.js';
import makeRequest from './Request.js';
import type {
  AllowedHafasProfile,
  HafasResponse,
  ParsedCommon,
} from '#/types/HAFAS/index.js';
import type {
  SearchOnTripRequest,
  SearchOnTripResponse,
} from '#/types/HAFAS/SearchOnTrip.js';
import type { SingleRoute } from '#/types/routing.js';

const parseSearchOnTrip = (
  d: HafasResponse<SearchOnTripResponse>,
  common: ParsedCommon,
) => {
  const joruney = new Journey(d.svcResL[0].res.outConL[0], common);
  return joruney.parseJourney();
};

export default (
  req: SearchOnTripRequest['req'],
  profile?: AllowedHafasProfile,
  raw?: boolean,
): Promise<SingleRoute> => {
  const request: SearchOnTripRequest = {
    req,
    meth: 'SearchOnTrip',
  };

  return makeRequest(request, raw ? undefined : parseSearchOnTrip, profile);
};
