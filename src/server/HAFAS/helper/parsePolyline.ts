import gPoly from 'google-polyline';
import type {
  HafasStation,
  ParsedPolyline,
  PolyL,
} from '#/types/HAFAS/index.js';

export default (polyline: PolyL, locL: HafasStation[]): ParsedPolyline => {
  return {
    points: gPoly.decode(polyline.crdEncYX),
    delta: polyline.delta,
    locations: polyline.ppLocRefL.map((l) => locL[l.locX]),
  };
};
