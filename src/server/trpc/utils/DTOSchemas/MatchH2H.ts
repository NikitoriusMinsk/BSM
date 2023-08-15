import { z } from "zod";
import { matchStatus } from "./Match";

const matchSchema = z.object({
	matchId: z.number(),
	teams: z
		.object({
			teamId: z.number(),
			teamName: z.string(),
			image: z.string().url().nullish(),
			score: z.number(),
		})
		.array(),
	duration: z.string().nullish(),
	date: z.string(),
	status: matchStatus,
	leagueId: z.number(),
	leagueName: z.string(),
	leagueLogo: z.string().url().nullish(),
	countryId: z.number(),
	countryLogo: z.string().url().nullish(),
});

const teamStatisticSchema = z.object({
	teamId: z.number(),
	teamName: z.string(),
	overAll: matchSchema.array(),
	homeMatches: matchSchema.array(),
	awayMatches: matchSchema.array(),
});

const matchH2HSchema = z.object({
	team1: teamStatisticSchema,
	team2: teamStatisticSchema,
	h2h: matchSchema.array(),
});

export default matchH2HSchema;
