// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";

import { authOptions as nextAuthOptions } from "../../pages/api/auth/[...nextauth]";

export const createContext = async (opts?: trpcNext.CreateNextContextOptions) => {
	const req = opts?.req;
	const res = opts?.res;

	const session =
		req && res && (await getServerSession(req, res, nextAuthOptions));

	return {
		req,
		res,
		session,
	};
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
