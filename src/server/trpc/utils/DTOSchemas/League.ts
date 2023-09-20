import { z } from "zod";
import matchSchema from "./Match";

const leagueSchema = z.object({
	id: z.number(),
	name: z.string(),
	country: z.string().nullish(),
	count: z.number().nullish(),
	image: z.string().url().nullish(),
	matches: matchSchema.array().nullish(),
	slug: z.string(),
});

export default leagueSchema;
