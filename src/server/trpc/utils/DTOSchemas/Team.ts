import { z } from "zod";

const teamSchema = z.object({
	id: z.number(),
	name: z.string(),
	image: z.string().url(),
	score: z.number(),
});

export default teamSchema;
