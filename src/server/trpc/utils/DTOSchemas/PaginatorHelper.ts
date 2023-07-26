import { z } from "zod";

const sortSchema = z.object({
	empty: z.boolean(),
	sorted: z.boolean(),
	unsorted: z.boolean(),
});

function paginatorHelper<O extends object>(schema: z.Schema<O>) {
	const paginatorSchema = z.object({
		totalPages: z.number(),
		totalElements: z.number(),
		size: z.number(),
		content: schema,
		number: z.number(),
		sort: sortSchema,
		pageable: z.object({
			offset: z.number(),
			sort: sortSchema,
			pageNumber: z.number(),
			pageSize: z.number(),
			paged: z.boolean(),
			unpaged: z.boolean(),
		}),
	});

	return paginatorSchema;
}

export default paginatorHelper;
