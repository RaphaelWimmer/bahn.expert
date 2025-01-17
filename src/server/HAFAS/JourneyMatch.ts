import { HafasJourneyDetails } from '@/server/HAFAS/JourneyDetails';
import { Cache, CacheDatabase } from '@/server/cache';
import { AllowedHafasProfile } from '@/types/HAFAS';
import type { HafasResponse, ParsedCommon } from '@/types/HAFAS';
import type {
	EnrichedJourneyMatchOptions,
	JourneyMatchOptions,
	JourneyMatchRequest,
	JourneyMatchResponse,
	ParsedJourneyMatchResponse,
} from '@/types/HAFAS/JourneyMatch';
import { format, parse, subDays } from 'date-fns';
import makeRequest, { HafasError } from './Request';
import parseMessages from './helper/parseMessages';
import parseStop from './helper/parseStop';

const journeyMatchCache = new Cache<ParsedJourneyMatchResponse[]>(
	CacheDatabase.HAFASJourneyMatch,
);

const parseJourneyMatch = (
	d: HafasResponse<JourneyMatchResponse>,
	common: ParsedCommon,
): Promise<ParsedJourneyMatchResponse[]> => {
	return Promise.all(
		d.svcResL[0].res.jnyL.map((j) => {
			const date = parse(j.date, 'yyyyMMdd', new Date());
			const train = common.prodL[j.prodX];
			const stops = j.stopL.map((stop) => parseStop(stop, common, date, train));

			return {
				train,
				stops,
				jid: j.jid,
				firstStop: stops[0],
				lastStop: stops.at(-1)!,
				messages: parseMessages(j.msgL, common),
			};
		}),
	);
};

const JourneyMatch = async (
	{
		trainName,
		initialDepartureDate,
		withOEV,
	}: Omit<JourneyMatchOptions, 'jnyFltrL'> & {
		withOEV?: boolean;
	},
	profile: AllowedHafasProfile = AllowedHafasProfile.DB,
	raw?: boolean,
): Promise<ParsedJourneyMatchResponse[]> => {
	let date = initialDepartureDate;

	if (!date) {
		const now = new Date();

		date = now.getHours() < 3 ? subDays(now, 1) : now;
	}

	const formattedDate = format(date, 'yyyyMMdd');
	const cacheKey = `${trainName}-${formattedDate}-${withOEV}-${profile}`;
	try {
		if (!raw) {
			const cached = await journeyMatchCache.get(cacheKey);
			if (cached) {
				return cached;
			}
		}
		const req: JourneyMatchRequest = {
			req: {
				date: formattedDate,
				input: trainName,
				jnyFltrL: withOEV
					? undefined
					: [
							{
								mode: 'INC',
								type: 'PROD',
								value: '31',
							},
						],
				onlyRT: false,
			},
			meth: 'JourneyMatch',
		};

		const result = await makeRequest(
			req,
			raw ? undefined : parseJourneyMatch,
			profile,
		);

		if (!raw) {
			const shorterTTL = !result.length ? 'PT2H' : undefined;
			void journeyMatchCache.set(cacheKey, result, shorterTTL);
		}

		return result;
	} catch (e) {
		if (e instanceof HafasError && e.errorCode === 'NO_MATCH') {
			void journeyMatchCache.set(cacheKey, [], 'PT1H');
		}
		// We just ignore errors and pretend nothing got returned.
		return [];
	}
};

export default JourneyMatch;

const fallbackTypeRegex = /(.+?)( |\d|\b).*\d+/;

export async function enrichedJourneyMatch(
	{
		withOEV,
		...options
	}: Omit<EnrichedJourneyMatchOptions, 'jnyFltrL'> & {
		withOEV?: boolean;
	},
	profile?: AllowedHafasProfile,
): Promise<ParsedJourneyMatchResponse[]> {
	const journeyMatches = (await JourneyMatch(options, profile)).filter(
		(match) => match.train.type !== 'Flug',
	);

	const limitedJourneyMatches = options.limit
		? journeyMatches.slice(0, options.limit)
		: journeyMatches;

	for (const j of limitedJourneyMatches) {
		const details = await HafasJourneyDetails(j.jid, profile);
		if (!details) continue;

		j.firstStop = details.firstStop;
		j.lastStop = details.lastStop;
		j.stops = details.stops;
		// j.train = details.train;

		if (!j.train.type) {
			j.train.type = fallbackTypeRegex.exec(j.train.name)?.[1];
		}
	}

	return limitedJourneyMatches;
}
