import type { JourneyFilter } from '#/types/HAFAS/index.js';

export interface JourneyGraphRequestOptions {
  /**
   * yyyyMMdd
   */
  date?: string;
  getPasslist?: boolean;
  getProductStartEndInfo?: boolean;
  jnyFltrL?: JourneyFilter[];
}

export interface JourneyGraphRequest {
  req: JourneyGraphRequestOptions;
  meth: 'JourneyGraph';
}

export type JourneyGraphResponse = any;
