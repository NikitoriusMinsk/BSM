// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/trpc/root";
import { createTRPCContext } from "src/server/trpc/trpc";
import { env } from "@/env.mjs";
import { ZodError } from "zod";

// export API handler
export default createNextApiHandler({
	router: appRouter,
	createContext: createTRPCContext,
	onError:
		env.NODE_ENV === "development"
			? ({ path, error }) => {
					console.error(
						`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
					);
			  }
			: ({ path, error }) => {
					if (error.cause instanceof ZodError) {
						// Returning only first zod error message to client
						error.message = JSON.parse(error.message)[0].message;
					}
			  },
});
