import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { leagueSchema, matchSchema, sportSchema } from "../utils/DTOSchemas";
import makeApiCall from "../utils/makeApiCall";
import { matchStatus } from "../utils/DTOSchemas/Match";

export const pageGenerationRouter = createTRPCRouter({
	getSportWithMatches: publicProcedure.query(async ({ ctx, input }) => {
		const schema = sportSchema
			.merge(z.object({ matches: z.string().array() }))
			.array();

		return await makeApiCall("sports/matches", schema, { method: "GET" });
	}),
	getSportWithLeagues: publicProcedure.query(async ({ ctx, input }) => {
		const schema = sportSchema
			.merge(z.object({ competitions: z.string().array() }))
			.array();

		return await makeApiCall("sports/leagues", schema, { method: "GET" });
	}),
	getMatchBySlug: publicProcedure
		.input(z.object({ slug: z.string() }))
		.query(async ({ ctx, input }) => {
			const { slug } = input;

			return await makeApiCall(
				`matches/bySlug/${slug}`,
				matchSchema
					.omit({ date: true, odds: true, status: true })
					.merge(z.object({ matchStatus: matchStatus })),
				{
					method: "GET",
				}
			);
		}),
	getLeagueBySlug: publicProcedure
		.input(z.object({ slug: z.string() }))
		.query(async ({ ctx, input }) => {
			const { slug } = input;

			return await makeApiCall(`leagues/bySlug/${slug}`, leagueSchema, {
				method: "GET",
			});
		}),
});
