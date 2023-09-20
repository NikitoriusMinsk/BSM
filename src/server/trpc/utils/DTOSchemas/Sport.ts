import { z } from "zod";

const sportSchema = z.object({
	id: z.number(),
	name: z.string(),
	image: z
		.string()
		.url()
		.nullish()
		.or(z.enum([""])),
});

export default sportSchema;
