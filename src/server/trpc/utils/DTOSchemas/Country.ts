import { z } from "zod";
import leagueSchema from "./League";

const countrySchema = z.object({
	id: z.number(),
	name: z.string().nullish(),
	image: z
		.string()
		.url()
		.nullish()
		.or(z.enum([""])),
	leagues: leagueSchema.array().nullish(),
});

export default countrySchema;
