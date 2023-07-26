import { z } from "zod";

const oddsSchema = z.object({
	home: z.number().nullish(),
	away: z.number().nullish(),
	draw: z.number().nullish(),
	over: z.number().nullish(),
	under: z.number().nullish(),
	handicap: z.number().nullish(),
});

export default oddsSchema;
