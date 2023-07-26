import { z } from "zod";
import teamSchema from "./Team";
import oddsSchema from "./Odds";

const matchSchema = z.object({
	id: z.number(),
	teams: teamSchema.array(),
	duration: z.string(),
	date: z.date(),
	status: z.string(),
	odds: oddsSchema,
	tipCount: z.number(),
});

export default matchSchema;
