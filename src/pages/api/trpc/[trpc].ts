// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/trpc/router/_app";
import { createContext } from "../../../server/trpc/context";
import { ZodError } from "zod";

// export API handler
export default createNextApiHandler({
	router: appRouter,
	createContext: createContext,
	onError(opts) {
		const { error, type, path, input, ctx, req } = opts;
		if (error.cause instanceof ZodError) {
			// Returning only first zod error message to client
			error.message = JSON.parse(error.message)[0].message;
		}
	},
});
