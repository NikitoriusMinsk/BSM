import { z } from "zod";

const oddsSchema = z.object({
	home: z.number(),
	away: z.number(),
	draw: z.number(),
	over: z.number(),
	under: z.number(),
	handicap: z.number(),
});

export default oddsSchema;
