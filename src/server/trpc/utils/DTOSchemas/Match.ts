import { z } from "zod";
import teamSchema from "./Team";
import oddsSchema from "./Odds";

const matchSchema = z.object({
	id: z.number(),
	teams: teamSchema.array(),
	duration: z.string().nullish(),
	date: z.string(),
	status: z.enum([
		"Abnormal",
		"Not started",
		"First half",
		"Half-time",
		"Second half",
		"Overtime",
		"Overtime(deprecated)",
		"Penalty Shoot-out",
		"End",
		"Delay",
		"Interrupt",
		"Cut in half",
		"Cancel",
		"To be determined",
	]),
	odds: oddsSchema,
	tipCount: z.number().nullish(),
});

export default matchSchema;
