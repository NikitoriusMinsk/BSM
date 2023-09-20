import { z } from "zod";

const teamSchema = z.object({
	id: z.number(),
	name: z.string(),
	image: z
		.string()
		.url()
		.nullish()
		.or(z.enum([""])),
	score: z.number().nullish(),
});

export default teamSchema;
